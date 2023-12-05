import { useEffect, useState } from "react";
import Select from "react-select";
import { selectTheme, changeRateCurrencys } from "../../constants";
import axios from "axios";
import toast from "react-hot-toast";

function RateForm() {
  const [query, setQuery] = useState({
    changeFrom: "btc",
    changeTo: "eth",
    amountFrom: 0.1,
    amountTo: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // get rate of two crypto from swapzone api :
  const getRate = async () => {
    // check rate form select options
    if (
      query.changeFrom.toLocaleLowerCase() == query.changeTo.toLocaleLowerCase()
    ) {
      toast("please change one of options");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SWAPZONE_BASE_URL
        }/get-rate?from=${query.changeFrom.toLowerCase()}&to=${query.changeTo.toLowerCase()}&amount=${String(
          query.amountFrom
        )}&rateType=all&availableInUSA=false&chooseRate=best&noRefundAddress=false`,
        {
          headers: { "x-api-key": import.meta.env.VITE_SWAPZONE_API_KEY },
        }
      );
      setQuery((prev) => {
        return { ...prev, amountTo: data.amountTo };
      });
      if (data.error) {
        throw new Error(data.message);
      }
    } catch ({ message }) {
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const rateChangeHandle = (e) => {
    setQuery((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    getRate();
  }, []);

  return (
    <div
      id="form_rate"
      className={`bg-secondary-100 border-[3px] border-[#22251b] rounded-md py-2 px-4`}
    >
      <div className="my-3">
        <h1 className="text-white-99 text-sm">Get Last Rate Of :</h1>
      </div>

      <form className="flex justify-center md:justify-around gap-x-4 my-7">
        <div className="w-1/2 md:w-auto flex flex-col items-center justify-center gap-y-3">
          <p className="text-secondary-600 text-sm sm:text-base">
            Change from :
          </p>

          <Select
            className="w-full"
            defaultValue={changeRateCurrencys[0]}
            isSearchable={false}
            options={changeRateCurrencys}
            theme={selectTheme}
            onChange={(e) =>
              setQuery((prev) => {
                return { ...prev, changeFrom: e.value };
              })
            }
          />

          <div className="flex justify-center items-center">
            <input
              type="number"
              name="amountFrom"
              className={`w-28 bg-secondary-600 border-none outline-none rounded px-2 py-1
              ${isLoading && "opacity-30 cursor-wait"}
              `}
              value={query.amountFrom}
              disabled={isLoading}
              onChange={(e) => rateChangeHandle(e)}
            />
          </div>
        </div>
        <div className="w-1/2 md:w-auto flex flex-col items-center justify-center gap-y-3">
          <p className="text-secondary-600 text-sm sm:text-base">Change To :</p>
          <Select
            className="w-full"
            defaultValue={changeRateCurrencys[1]}
            isSearchable={false}
            options={changeRateCurrencys}
            onChange={(e) =>
              setQuery((prev) => {
                return { ...prev, changeTo: e.value };
              })
            }
            theme={selectTheme}
          />
          <div className="flex justify-center items-center">
            <input
              type="number"
              name="amountTo"
              className={`w-28 bg-secondary-600 border-none outline-none rounded px-2 py-1
              ${isLoading && "opacity-30 cursor-wait"}
              `}
              disabled={isLoading}
              value={query.amountTo}
              onChange={(e) => rateChangeHandle(e)}
            />
          </div>
        </div>
      </form>
      <button
        onClick={() => getRate()}
        className="bg-[#22251b] text-primary-100 w-full py-2 mt-2 mb-2 rounded-full"
      >
        {isLoading ? "changing..." : "exchange"}
      </button>
    </div>
  );
}

export default RateForm;
