import { useEffect, useState } from "react";
import SingleCoinDetail from "/src/components/CoinRowDetail/SingleCoinDetail";
import { Link } from "react-router-dom";
import { useCoinsData } from "../../../components/Context/CoinsContext";
import { uuids } from "../../../constants";
import RatesTableLoader from "../../../components/LoadingComponents/RatesTableLoader";

export default function CoinsRateSection() {
  const [timeFilter, setTimeFilter] = useState({
    title: "Weekly",
    timeQuery: "7d",
  });
  const {
    coinsData: { isLoading, rateListData },
    getCoinsRateHandler,
  } = useCoinsData();

  // send request api
  useEffect(() => {
    getCoinsRateHandler(
      `/coins?${uuids.getUIDList(5)}timePeriod=${timeFilter.timeQuery}`,
      import.meta.env.VITE_COINRANK_BASAE_URL
    );
  }, [timeFilter]);

  // change time filter
  const changeTimePeriodHandle = ({ target: { innerText } }, time) => {
    setTimeFilter({ title: innerText, timeQuery: time });
  };

  return (
    <div className="mt-14 container 2xl:max-w-6xl mx-auto">
      <div className="flex flex-col gap-y-2 sm:flex-row px-2">
        {/* title  */}
        <div className="p-2 md:flex-1">
          <h2 className="text-2xl text-white-100 text-center sm:text-left leading-8 sm:leading-8 p-1 font-semibold">
            Last <span className="text-primary-100">Rates </span>
          </h2>
          <p className="text-center text-sm text-white-95 leading-[20px] sm:text-left">
            <strong>
              Be aware of the latest price rates of top currencies!
            </strong>
            &nbsp; You can change the desired time period by changing the filter
          </p>
        </div>
        {/* time period filter */}
        <div className="flex items-center justify-center py-2 px-2">
          <div className="bg-secondary-200 border-[1px] border-secondary-300 rounded-full py-2 px-3 flex justify-around items-center w-64 gap-x-2">
            <button
              onClick={(e) => changeTimePeriodHandle(e, "7d")}
              className={`${
                timeFilter.title === "Weekly" &&
                "bg-primary-100 !text-secondary-150"
              } text-white-95 text-xs sm:text-sm p-3 rounded-full w-1/2 transition-all`}
            >
              Weekly
            </button>
            <button
              onClick={(e) => changeTimePeriodHandle(e, "30d")}
              className={`${
                timeFilter.title === "Monthly" &&
                "bg-primary-100 !text-secondary-150"
              } text-white-95 text-xs sm:text-sm p-3 rounded-full w-1/2 transition-all`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      {/* coins table */}
      <div className="mt-6 sm:flex px-2 sm:px-0">
        <div className="hidden sm:flex flex-col items-center px-4 w-1/3">
          <p className="text-white-90 text-base leading-6 ">
            Easily check the latest exchange rate you want and find out the
            profit and loss of your capital. If needed, you can navigate to the
            Coins page to read the information you need in more detail. Get the
            latest news on the digital currency market in the shortest possible
            time. You can also change the time frame you want by changing the
            filter in the corner of the page
          </p>
          <Link
            to="rates"
            className="text-secondary-150 bg-primary-300 hover:bg-secondary-400 hover:text-white-90 transition-colors px-4 py-2 text-base rounded-full mt-8"
          >
            Show More
          </Link>
        </div>

        <CoinsRates
          isLoading={isLoading}
          data={rateListData}
          timeFilter={timeFilter}
        />
      </div>
    </div>
  );
}

function CoinsRates({ isLoading, data, timeFilter }) {
  if (isLoading)
    return (
      <div className="sm:px-4 w-full md:w-2/3">
        <RatesTableLoader height={7} />
      </div>
    );

  if (!isLoading && data && data.coins)
    return (
      <div className="sm:px-4 w-full md:w-2/3">
        <div className="bg-secondary-300 flex justify-between px-4 py-2">
          <p className="text-white-90 w-1/3 flex justify-start">All Coins</p>
          <p className="text-white-90 w-1/3 flex justify-center">Price</p>
          <p className="text-white-90 w-1/3 flex justify-end">
            {timeFilter === "Daily" ? "24h" : "7 days"}
          </p>
        </div>
        {data.coins.map((coin) => (
          <SingleCoinDetail key={Math.random() * 10} {...coin} />
        ))}
      </div>
    );
}
