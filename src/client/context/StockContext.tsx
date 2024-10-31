import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useServer, { PredictionsDataType } from "../hooks/useServer";
import { TrainingPeriodSize } from "../components/ResizableApp/ResizableApp";

type StockInfo = {
  currentPrice: number;
  differencePercentage: number;
  name: string;
  previousClose: number;
  ticker: string;
};

type StockContextType = {
  stock: StockInfo | null;
  updateStock: (newStock: StockInfo) => void;
  companiesListData: StockInfo[] | null;
  companiesListDataLoading: boolean;
  predictionsData: PredictionsDataType | null;
  fetchPredictionsData: (ticker: string) => void;
  filters: FitersType;
  setFilters: (value: FitersType) => void;
};

type FitersType = {
  searchText: string;
  selectedPeriod: TrainingPeriodSize;
  selectedNextDays: number;
};

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const {
    data: companiesListData,
    loading: companiesListDataLoading,
    predictionsData,
    fetchPredictionsData,
  } = useServer();

  const [stock, setStock] = useState<StockInfo | null>(
    companiesListData?.[0] ?? null
  );

  const [filters, setFilters] = useState<FitersType>({
    searchText: "",
    selectedPeriod: TrainingPeriodSize.SHORT,
    selectedNextDays: 1,
  });

  const updateStock = (newStock: StockInfo) => {
    setStock(newStock);
  };

  useEffect(() => {
    if (companiesListData) {
      setStock(companiesListData[0]);
      fetchPredictionsData(companiesListData[0].ticker);
    }
  }, [companiesListData]);

  return (
    <StockContext.Provider
      value={{
        stock,
        updateStock,
        companiesListData,
        companiesListDataLoading,
        predictionsData,
        fetchPredictionsData,
        filters,
        setFilters,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};
