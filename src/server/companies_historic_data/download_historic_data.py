import yfinance as yf
import pandas as pd
import json

index = 0  

def download_historic_data(company_dict, start_date, end_date):
  global index

  for symbol, company_name in company_dict.items():
    if index < 5:
      try:
        stock_data = yf.download(symbol + ".NS", start=start_date, end=end_date,multi_level_index=True)
        
        # Remove the first two rows (assuming they are incorrect)
        new_stock_data = stock_data.iloc[2:]
        # Option 1: Using Index as Date Column
        # new_stock_data["Date"] = new_stock_data.index  # Add index as "Date" column

        # Option 2: Manually Add Date Column (Uncomment and customize)
        # dates = pd.date_range(start=start_date, end=end_date)  # Generate date range
        # stock_data["Date"] = dates[:len(stock_data)]  # Add dates as "Date" column

        new_stock_data.to_csv(f"data/{company_name}_historical_data.csv")
        print(f"Downloaded data for {company_name}")
        index += 1
      except Exception as e:
        print(f"Error downloading data for {company_name}: {e}")


def main():
  with open('../companies_names/nse_companies.json', 'r') as f:
    company_dict = json.load(f)

  start_date = '2023-01-01'
  end_date = '2024-10-30'

  download_historic_data(company_dict, start_date, end_date)


if __name__ == "__main__":
  main()