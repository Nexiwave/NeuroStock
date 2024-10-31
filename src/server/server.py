import json
from flask import Flask,jsonify
import yfinance as yf
from flask_cors import CORS
from predictions import predict_future_prices
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/stocks')
def get_stock_data():
    with open('companies_names/nse_companies.json', 'r') as f:
        stocks = json.load(f)

    stock_data = []
    for ticker in stocks:
        stock = yf.Ticker(ticker+".NS")
        info = stock.info
        stock_data.append({
            "currentPrice": info['currentPrice'],
            "previousClose": info['regularMarketPreviousClose'],
            "differencePercentage": round(((info['currentPrice'] - info['regularMarketPreviousClose']) / info['regularMarketPreviousClose']) * 100, 2),
            "name":stocks[ticker],
            "ticker":ticker
        })
        if ticker=="ITC":
            break
        # write custom logic to fetch only 10

    return jsonify(stock_data)

@app.route('/stocks-prediction/<ticker>')
def get_stock_prediction_data(ticker):
    """
    Fetches stock data for the provided ticker symbol.

    Args:
        ticker (str): The ticker symbol of the stock.

    Returns:
        dict: A dictionary containing the fetched stock data or an error message.
    """

    try:
        graph_data,predictions=predict_future_prices.predict_future_prices(ticker+".NS",prediction_days=1)
        graph_data_mapped = [
            {
                "price": price,
                "predictedPrice": predicted_price,
                "date": date.strftime('%d-%m-%Y')
            }
            for price, predicted_price, date in zip(graph_data[0], graph_data[1], graph_data[2])
        ]
        return jsonify({"graph_data":graph_data_mapped,"predictions":predictions})
    except (KeyError):
        return jsonify({"error": "Invalid ticker symbol or data unavailable."}), 400

if __name__ == '__main__':
    app.run(debug=True)