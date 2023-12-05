import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import { reduceCoinHistory } from "../../utils";

const CoinsContextProvider = createContext();

const initialCoinData = {
  rateListData: [],
  coinPriceHitory: [],
  isLoading: false,
  error: false,
};

const coinsReducer = (state, action) => {
  switch (action.type) {
    // get rate's table data swicth
    case "loading":
      return { ...state, isLoading: true };
    case "rateListData-loaded":
      return {
        ...state,
        rateListData: action.payload,
        isLoading: false,
        error: false,
      };
    case "rateListData-error":
      return { rateListData: [], isLoading: false, error: action.payload };
    case "coinPriceHitory-loaded":
      return {
        ...state,
        coinPriceHitory: action.payload,
        isLoading: false,
        error: false,
      };
    case "coinPriceHitory-error":
      return {
        ...state,
        coinPriceHitory: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknow action");
  }
};

function CoinsContext({ children }) {
  const [coinsData, dispatcher] = useReducer(coinsReducer, initialCoinData);

  // get rates and price of multiple coins
  const getCoinsRateHandler = async (query, baseUrl) => {
    if (!query) return;

    // disoatch loading case
    dispatcher({ type: "loading" });

    try {
      const {
        data: { status, data },
      } = await axios.get(`${baseUrl}${query}`, {
        headers: {
          "x-access-token": import.meta.env.VITE_COINRANKK_API_KEY,
        },
      });

      // dispatch seccess case
      dispatcher({ type: "rateListData-loaded", payload: data });
    } catch (error) {
      dispatcher({ type: "rateListData-error", payload: error });
      toast.error(error.message);
    }
  };

  // get price history of a coin
  const getCoinPriceHistory = async (query, timeFormat) => {
    if (!timeFormat) return;

    // disoatch loading case
    dispatcher({ type: "loading" });

    try {
      const {
        data: { status, data },
      } = await axios.get(
        `${import.meta.env.VITE_COINRANK_BASAE_URL}${query}`,
        {
          headers: {
            "x-access-token": import.meta.env.VITE_COINRANKK_API_KEY,
          },
        }
      );
      dispatcher({
        type: "coinPriceHitory-loaded",
        // reduce api response to sorted array
        payload: reduceCoinHistory(data, timeFormat),
      });
    } catch (error) {
      dispatcher({ type: "coinPriceHitory-error", payload: error });
      toast.error(error.message);
    }
  };

  return (
    <CoinsContextProvider.Provider
      value={{ coinsData, getCoinsRateHandler, getCoinPriceHistory }}
    >
      {children}
    </CoinsContextProvider.Provider>
  );
}

export default CoinsContext;

export const useCoinsData = () => {
  return useContext(CoinsContextProvider);
};
