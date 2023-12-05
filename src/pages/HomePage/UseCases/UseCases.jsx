import { useEffect } from "react";
import {
  FaCashRegister,
  FaCediSign,
  FaChartColumn,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { useCoinsData } from "../../../components/Context/CoinsContext";
import { uuids } from "../../../constants";
import SimpleLineChart from "../../../components/Charts/LineChart/SimpleLineChart";
import { Link } from "react-router-dom";

function UseCases() {
  const { getCoinPriceHistory } = useCoinsData();
  const selectedCurrency = uuids.getUIDByName("bitcoin");

  useEffect(() => {
    getCoinPriceHistory(
      `/coin/${selectedCurrency.id}/history?timePeriod=1y`,
      "1y"
    );
  }, []);

  return (
    <div className="mt-16 mx-auto container 2xl:max-w-6xl">
      {/* header title */}
      <div id="head_title" className="px-6 sm:px-12">
        <h2 className="text-primary-100 hover:text-primary-200 transition-all text-xl text-center sm:text-left my-4">
          Use Cases
        </h2>
        <p className="text-center sm:text-left text-sm sm:text-base text-secondary-500">
          At YourBank, we cater to the diverse needs of individuals and
          businesses alike, offering a wide range of financial solutions
        </p>
      </div>
      {/* top wrapper use cases */}
      <div
        id="top__wrapper"
        className="flex flex-col sm:flex-row sm:justify-between"
      >
        <div className="flex items-center justify-center sm:w-1/2 sm:px-10 p-6">
          <div className="bg-secondary-150 relative w-full rounded-xl flex-col px-4 py-2 ">
            <div className="absolute inset-0 z-0">
              <img
                src="./images/Abstract-use-case.svg"
                alt="Abstract-design"
                className="w-28 z-[-1] inset-0"
              />
            </div>

            <div className="flex justify-between gap-x-2 my-5 sm:my-8">
              <div className="bg-secondary-100 w-1/2 flex flex-col gap-y-2 justify-center items-center basis-1/2 px-6 py-4 border-[1px] border-secondary-200 rounded-2xl z-10">
                <div className="bg-primary-100 bg-opacity-5 rounded-full p-4 hover:scale-125 hover:bg-opacity-10 transition-all">
                  <FaMoneyBillTransfer className="text-primary-300 text-2xl sm:text-3xl" />
                </div>
                <span className="text-xs text-white-95 whitespace-nowrap text text-center">
                  Managing <br />
                  Personal Finances
                </span>
              </div>
              <div className="bg-secondary-100 w-1/2 flex flex-col gap-y-2 justify-center items-center basis-1/2 px-6 py-4 border-[1px] border-secondary-200 rounded-2xl z-10">
                <div className="bg-primary-100 bg-opacity-5 rounded-full p-4 hover:scale-125 hover:bg-opacity-10 transition-all">
                  <FaCediSign className="text-primary-300 text-2xl sm:text-3xl" />
                </div>
                <span className="text-xs text-white-95 whitespace-nowrap text text-center">
                  Saving for the <br /> Future
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-x-2 my-5 sm:my-8">
              <div className="bg-secondary-100 w-1/2 flex flex-col gap-y-2 justify-center items-center basis-1/2 px-6 py-4 border-[1px] border-secondary-200 rounded-2xl z-10">
                <div className="bg-primary-100 bg-opacity-5 rounded-full p-4 hover:scale-125 hover:bg-opacity-10 transition-all">
                  <FaCashRegister className="text-primary-300 text-2xl sm:text-3xl" />
                </div>
                <span className="text-xs text-white-95 whitespace-nowrap text text-center">
                  Homeownership
                </span>
              </div>
              <div className="bg-secondary-100 w-1/2 flex flex-col gap-y-2 justify-center items-center basis-1/2 px-6 py-4 border-[1px] border-secondary-200 rounded-2xl z-10">
                <div className="bg-primary-100 bg-opacity-5 rounded-full p-4 hover:scale-125 hover:bg-opacity-10 transition-all">
                  <FaChartColumn className="text-primary-300 text-2xl sm:text-3xl" />
                </div>
                <span className="text-xs text-white-95 whitespace-nowrap text text-center">
                  Education <br /> Funding
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-1/2 px-4 py-2 sm:py-8 flex-col">
          <div className="text-wihte h-4/5 flex flex-col justify-between">
            <div className="">
              <h2 className="text-white-90 text-xl text-center sm:text-left">
                For Individuals
              </h2>
              <p className="text-center sm:text-left text-sm text-secondary-500 mt-4">
                For individuals, our mortgage services pave the way to
                homeownership, and our flexible personal loans provide vital
                support during various life milestones. We also prioritize
                retirement planning, ensuring a financially secure future for
                our customers
              </p>
            </div>

            <div className="flex flex-col mt-4 sm:mt-0 gap-y-6 sm:gap-x-6 sm:flex-row">
              <p className="text-xl text-primary-100 text-center sm:text-left">
                78%
                <br />
                <span className="text-xs text-secondary-500 border-b-2 border-primary-100 pb-4 sm:pb-0 mt-[-70px] border-opacity-30 border-dotted">
                  Secure Retirement Planning
                </span>
              </p>

              <p className="text-xl text-primary-100 text-center sm:text-left">
                63%
                <br />
                <span className="text-xs text-secondary-500 border-b-2 border-primary-100 pb-4 sm:pb-0 border-opacity-30 border-dotted">
                  Manageable Debt Consolidation
                </span>
              </p>

              <p className="text-xl text-primary-100 text-center sm:text-left">
                91%
                <br />
                <span className="text-xs text-secondary-500">
                  Reducing financial burdens
                </span>
              </p>
            </div>
          </div>
          <div className="text-wihte h-1/5 mt-6 sm:mt-7 flex justify-center sm:justify-normal sm:items-start">
            <button className="bg-secondary-200 hover:bg-secondary-100 transition-all text-white-90 px-4 py-2 rounded-2xl text-sm rounded- border-[1px] border-secondary-300">
              learn more
            </button>
          </div>
        </div>
      </div>
      {/* bottom wrapper 'line chart' */}
      <div
        id="bottom__wrapper"
        className=" flex flex-col sm:flex-row sm:justify-between"
      >
        <div className="sm:w-1/2 px-10 py-2 sm:py-8 flex-col order-2 sm:order-1">
          <div className="text-wihte h-4/5 flex flex-col justify-between">
            <div className="">
              <h2 className="text-white-90 text-xl text-center sm:text-left">
                Top chart
              </h2>
              <p className="text-center sm:text-left text-sm text-secondary-500 mt-4">
                You can choose your desired currency on the top chart page and
                see the price history in the linear chart. You can also add an
                investment position. For example, you can see the history of
                Bitcoin price in a recent year in a line chart...
              </p>
            </div>

            <div className="flex flex-col mt-4 sm:mt-0 gap-y-6 sm:gap-x-6 sm:flex-row">
              <p className="text-xl text-primary-100 text-center sm:text-left">
                <br />
                <span className="text-xs text-secondary-500 border-b-2 border-primary-100 pb-4 sm:pb-0 mt-[-70px] border-opacity-30 border-dotted">
                  Filter by time period
                </span>
              </p>

              <p className="text-xl text-primary-100 text-center sm:text-left">
                <br />
                <span className="text-xs text-secondary-500 border-b-2 border-primary-100 pb-4 sm:pb-0 border-opacity-30 border-dotted">
                  Show the highest prices
                </span>
              </p>

              <p className="text-xl text-primary-100 text-center sm:text-left">
                <br />
                <span className="text-xs text-secondary-500">
                  Add investment position
                </span>
              </p>
            </div>
          </div>
          <div className="text-wihte h-1/5 mt-6 sm:mt-7 flex justify-center sm:justify-normal sm:items-start">
            <Link
              to="topCharts"
              className="bg-secondary-200 hover:bg-secondary-100 transition-all text-white-90 px-4 py-2 rounded-2xl text-sm rounded- border-[1px] border-secondary-300"
            >
              go to charts
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full sm:w-3/4 justify-center sm:px-10 p-6 order-1 sm:order-2">
          <div className="bg-secondary-150 relative w-full rounded-xl flex-col px- py-2 ">
            <div className="absolute inset-0 z-0">
              <img
                src="./images/Abstract-use-case.svg"
                alt="Abstract-design"
                className="w-28 z-[-1] inset-0"
              />
            </div>
            {/* top charts */}
            <div className="pr-6 py-4 sm:py-4 sm:px-6">
              <SimpleLineChart secondayColor="#CAFF33" primaryColor="#FBFFF0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseCases;
