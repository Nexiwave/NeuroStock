# dowload xlsx file from: https://www.nseindia.com/regulations/listing-compliance/nse-market-capitalisation-all-companies
# Convert it to csv: https://cloudconvert.com/xlsx-to-csv
# Run this file after every March 31 and December 31
import pandas as pd
import json
def create_nse_company_dict(file_path):
    """
    Creates a dictionary of NSE company names and their symbols from a CSV file.

    Args:
        file_path (str): The path to the CSV file.

    Returns:
        dict: A dictionary with company names as keys and symbols as values.
    """

    df = pd.read_csv(file_path)
    df = df.dropna(subset=[ 'Symbol','Company Name'])  # Drop rows with NaN in specified columns
    company_dict = dict(zip( df['Symbol'],df['Company Name']))
    
    # Store the dictionary in a JSON file
    with open('nse_companies.json', 'w') as f:
        json.dump(company_dict, f, indent=4)

    return company_dict

# Example usage:
if __name__ == "__main__":
    file_path = "MCAP28032024.csv"
    company_dict = create_nse_company_dict(file_path)