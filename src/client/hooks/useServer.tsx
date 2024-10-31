import { useState, useEffect } from "react";

interface UseServerReturn {
  data: StockInfo[] | null;
  loading: boolean;
  error: Error | null;
  predictionsData: PredictionsDataType | null;
  setPredictionsData: (value: PredictionsDataType | null) => void;
  predictionsDataLoading: boolean;
  fetchPredictionsData: (ticker: string) => void;
}

type StockInfo = {
  currentPrice: number;
  differencePercentage: number;
  name: string;
  previousClose: number;
  ticker: string;
};

type GraphDataType = {
  date: string;
  predictedPrice: number;
  price: number;
};

export type PredictionsDataType = {
  graph_data: GraphDataType[];
  predictions: number[];
};

enum ServerEndPoints {
  StocksPrediction = "stocks-prediction",
  Stocks = "stocks",
}
function useServer(): UseServerReturn {
  const [data, setData] = useState<StockInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [predictionsData, setPredictionsData] =
    useState<PredictionsDataType | null>(null);
  const [predictionsDataLoading, setpredictionsDataLoading] = useState(false);

  const fetchPredictionsData = async (ticker: string) => {
    setpredictionsDataLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/${ServerEndPoints.StocksPrediction}/${ticker}`
    );
    const data = await response.json();
    setPredictionsData(data);
    setpredictionsDataLoading(false);
  };
  
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/${ServerEndPoints.Stocks}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        // @ts-ignore
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  return {
    data,
    loading,
    error,
    predictionsData,
    setPredictionsData,
    predictionsDataLoading,
    fetchPredictionsData,
  };
}

export default useServer;
