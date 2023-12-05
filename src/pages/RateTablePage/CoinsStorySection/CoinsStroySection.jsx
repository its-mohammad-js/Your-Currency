import { useRef, useState } from "react";
import { useCoinsData } from "../../../components/Context/CoinsContext";
import SimpleLineAreaChart from "../../../components/Charts/LineChart/SimpleLineAreaChart";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { changePriceFormat, findHighestAndLowestValues } from "../../../utils";
import { supportedTimeFormats } from "../../../constants";
import CoinStoryLoader from "../../../components/LoadingComponents/CoinStoryLoader";

export default function CoinStory({ timePeriod }) {
  const [isOpenStory, setIsopenStory] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(0);
  const wrapperRef = useRef();
  // get local storage viewed coins data
  const viewedCoins = JSON.parse(localStorage.getItem("viewedCoins")) || [];
  // check local storage viewed coins
  const isViewed = (coinIndex) => {
    return viewedCoins.find((c) => c === coinIndex) !== undefined;
  };
  // // get full time name from constants
  const timeName = supportedTimeFormats.find(
    (t) => t.timePeriod === timePeriod
  ).fullTimeName;

  // get rate list data from Coin Context and status
  const {
    coinsData: { isLoading, rateListData },
  } = useCoinsData();

  const getSingleCoin = (coinIndex) => {
    // set viewed coin in local storage if :
    if (!isViewed(coinIndex)) {
      localStorage.setItem(
        "viewedCoins",
        JSON.stringify([...viewedCoins, currentCoin])
      );
    }
    // get selected coin from api response
    if (!isLoading && rateListData.coins) {
      return rateListData.coins.filter((c, index) => index === coinIndex)[0];
    }
  };

  const NextCoinPageHandle = () => {
    if (currentCoin + 1 === rateListData.coins.length) {
      setIsopenStory(false);
    }
    setCurrentCoin(currentCoin + 1);
  };

  const PreviousCoinPageHandle = () => {
    if (currentCoin <= 0) {
      setIsopenStory(false);
    }
    setCurrentCoin(currentCoin - 1);
  };

  if (isLoading) return <CoinStoryLoader width={20} />;

  if (!isLoading && rateListData.coins) {
    return (
      <div className="container mx-auto 2xl:max-w-6xl">
        <div
          id="wrapper"
          ref={wrapperRef}
          className="w-full relative flex items-center scroll-smooth justify-start overflow-y-hidden overflow-x-auto md:overflow-x-hidden gap-x-5 py-2 px-2 sm:px-4"
        >
          {/* coins circle */}
          <button
            onClick={() => (wrapperRef.current.scrollLeft -= 300)}
            className="sticky h-20 px-6 hidden md:block -left-3 rounded-xl z-10 bg-primary-100 bg-opacity-40 focus:bg-opacity-95"
          >
            <IoIosArrowDropleft className="text-2xl" />
          </button>
          {rateListData.coins.map((coin, index) => (
            <div
              style={{ borderColor: coin.color }}
              onClick={() => {
                setCurrentCoin(index);
                setIsopenStory(true);
              }}
              key={`${coin.name}${coin.id}`}
              className={`${
                isViewed(index) && "opacity-50 border-dashed"
              } rounded-full p-2 flex items-center border-2 z-0`}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                <img
                  src={coin.iconUrl}
                  alt={coin.name}
                  className="max-w-full object-cover rounded-full"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => (wrapperRef.current.scrollLeft += 300)}
            className="sticky rounded-xl hidden md:block -right-3 px-6 z-10 h-20 bg-primary-100 bg-opacity-40 focus:bg-opacity-95"
          >
            <IoIosArrowDropright className="text-2xl" />
          </button>
        </div>

        {/* coin story modal */}
        <div
          className={`${
            isOpenStory ? "block" : "hidden"
          } fixed h-screen w-screen inset-0 flex items-center justify-center z-50`}
        >
          <div
            onClick={() => setIsopenStory(false)}
            className={`bg-secondary-300 bg-opacity-95 absolute inset-0`}
          ></div>

          {isOpenStory && (
            <CoinPage
              currentCoin={currentCoin}
              getSingleCoin={getSingleCoin}
              onNextPage={NextCoinPageHandle}
              onPreviousPage={PreviousCoinPageHandle}
              onCloseModalStory={() => setIsopenStory(false)}
              timeName={timeName}
            />
          )}
        </div>
      </div>
    );
  }
}

function CoinPage(props) {
  // destructure props
  const {
    currentCoin,
    getSingleCoin,
    onNextPage,
    onPreviousPage,
    onCloseModalStory,
    timeName,
  } = props;
  // get selected coin from api response
  const singleCoin = getSingleCoin(currentCoin);
  // get highest and lowest price from api response
  const { highest: highestPrice, lowest: lowestPrice } =
    findHighestAndLowestValues(singleCoin.sparkline);

  // change api response => sparkline or price history to array of objects
  const priceHistory = singleCoin.sparkline.map((d, index) => {
    if (d !== null)
      return {
        x: index + 1,
        y: Number(d),
      };
  });

  return (
    <div
      style={{
        backgroundColor: singleCoin.color,
      }}
      className={`w-11/12 sm:w-1/2 h-5/6 rounded-lg relative flex flex-col justify-between 2xl:max-w-6xl px-4 py-2`}
    >
      {/* title wrapper */}
      <div className="">
        <div
          className={`rounded-full p-2 flex items-center justify-start gap-x-4`}
        >
          <div className="bg-white-90 rounded-full w-14 h-14 sm:w-14 sm:h-14 flex items-center justify-center">
            <img
              src={singleCoin.iconUrl}
              alt={singleCoin.name}
              className="max-w-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-white-100">
            <span>details of :</span>{" "}
            <strong className="text-lg">{singleCoin.name}</strong>
          </h2>
        </div>

        <div className="relative">
          <p className="text-base text-white-100">
            <strong>{singleCoin.name}</strong> went
            <span>{singleCoin.change > 0 ? "up" : "down"}</span>
            <strong> {singleCoin.change}% </strong> today.
            <span>
              it went from{" "}
              <strong>
                $
                {singleCoin.change > 0
                  ? changePriceFormat(highestPrice)
                  : changePriceFormat(lowestPrice)}{" "}
                to $
                {singleCoin.change > 0
                  ? changePriceFormat(lowestPrice)
                  : changePriceFormat(highestPrice)}
              </strong>
              <span>
                {" "}
                in <strong>{timeName}</strong>
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* background image */}
      <div className="absolute inset-0 sbg-red-50 w-full h-full flex items-center justify-center opacity-20 z-0">
        <img
          src={singleCoin.iconUrl}
          alt=""
          className="max-h-full animate-pulse duration-1000"
        />
      </div>

      {/* simple line chart */}
      <div className="h-36 bg-secondary-200 rounded-2xl bg-opacity-25 py-10">
        <SimpleLineAreaChart
          lineData={priceHistory}
          lineKey={"y"}
          lineColor={"red"}
          areaColor={"#BFBFBF"}
        />
      </div>

      {/* control buttons */}
      <div className="w-full flex justify-start sm:justify-center z-40 gap-x-2">
        <button
          onClick={() => onPreviousPage()}
          className="bg-red-50 rounded-full px-4 py-3 text-lg sm:px-5 sm:py-4 text-secondary-100"
        >
          <FaArrowAltCircleLeft />
        </button>
        <button
          onClick={() => onCloseModalStory()}
          className="bg-red-50 rounded-full px-4 py-3 text-lg sm:px-5 sm:py-4 text-secondary-100"
        >
          <IoClose />
        </button>
        <button
          onClick={() => onNextPage()}
          className="bg-red-50 rounded-full px-4 py-3 text-lg sm:px-5 sm:py-4 text-secondary-100"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
}
