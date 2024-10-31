import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import math
import yfinance as yf

def predict_future_prices(ticker: str, prediction_days: int = 1):
    """
    Predict future stock prices based on historical data.

    Parameters:
    - ticker: An unique symbol for company
    - prediction_days: Number of future days to predict

    Returns:
    - future_predictions: List of predicted stock prices for the specified number of future days
    - predicted_dates_with_prices: List containing actual 'Close' prices, predictions, and dates for validation purposes
    """

    # Load and preprocess data
    start_date = '2023-01-01'
    end_date = '2024-10-30'
    df = yf.download(ticker, start=start_date, end=end_date,multi_level_index=False)
    data = df.filter(['Close'])
    dataset = data.values

    # Define training data length as 80% of the dataset
    train_data_len = math.ceil(len(dataset) * 0.8)

    # Scale data to fit within range (0, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)

    # Prepare training data
    train_data = scaled_data[:train_data_len]
    x_train, y_train = [], []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i - 60:i, 0])
        y_train.append(train_data[i, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)

    # Reshape data for LSTM model input
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # Build LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(LSTM(50, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))

    # Compile and train model
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(x_train, y_train, batch_size=1, epochs=1)

    # Prepare test data for model validation
    test_data = scaled_data[train_data_len - 60:]
    x_test, y_test = [], dataset[train_data_len:]

    for i in range(60, len(test_data)):
        x_test.append(test_data[i - 60:i, 0])

    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    # Generate predictions for the test dataset
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)

    # Predict future prices for the specified number of days
    last_60_days = data[-60:].values
    last_60_days_scaled = scaler.transform(last_60_days)
    future_input = np.array([last_60_days_scaled])

    # Initialize an empty list to store predictions for future days
    future_predictions = []

    for _ in range(prediction_days):
        # Reshape input to be compatible with LSTM model
        future_input = np.reshape(future_input, (future_input.shape[0], future_input.shape[1], 1))

        # Predict the next day's price
        pred_price = model.predict(future_input)
        pred_price = scaler.inverse_transform(pred_price)
        
        # Append prediction to the list
        future_predictions.append(float(pred_price[0][0]))

        # Update the input by appending the latest prediction and removing the oldest
        new_input = np.append(last_60_days_scaled, pred_price / scaler.data_max_).reshape(-1, 1)
        future_input = np.array([new_input[-60:]])

    # Handle SettingWithCopyWarning by using .loc for assignments
    validation_data = data[train_data_len:].copy()
    validation_data.loc[:, 'Predictions'] = predictions
    validation_data.loc[:, 'Date'] = df.index[train_data_len:]

    # Create predicted_dates_with_prices with 'Close' prices, predictions, and dates
    predicted_dates_with_prices = [
        validation_data['Close'].tolist(),
        validation_data['Predictions'].tolist(),
        list(validation_data['Date'])
    ]

    print(f"Predicted prices for the next {prediction_days} days: {future_predictions[0]}")

    return predicted_dates_with_prices, future_predictions
