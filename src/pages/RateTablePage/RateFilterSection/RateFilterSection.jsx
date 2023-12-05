import { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import {
  allowedOrders,
  allowedTags,
  supportedTimeFormats,
} from "../../../constants";
import { IoIosArrowDown } from "react-icons/io";

export default function RateFilterSection({
  onSelectFilter,
  selectedTags,
  timePeriod,
  orderBy,
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openAcc, setOpenAcc] = useState("");

  const toggleAcc = (accName) => {
    if (openAcc === accName) {
      setOpenAcc("");
    } else {
      setOpenAcc(accName);
    }
  };

  return (
    <div className="container mx-auto 2xl:max-w-6xl">
      {/* serach filter section */}
      <div
        id="wrapper"
        className="w-full border-b-[1px] bg-secondary-300 border-primary-100 flex items-center p-2 sm:px-6 sm:py-4"
      >
        {/* title */}
        <h2 className="text-sm hidden sm:block flex-1 md:text-2xl text-primary-100 font-semibold">
          Prices and Signals
        </h2>

        <div className="flex flex-1 sm:flex-[0] justify-between sm:justify-center items-center px-2 sm:px-0 gap-x-3 sm:gap-x-5">
          <select
            onChange={(e) => onSelectFilter(e.target.name, e.target.value)}
            name="OrderDir"
            className="bg-transparent text-primary-100 sm:text-lg lg:text-xl px-2 py-1 border-2 border-primary-100 rounded-md outline-none focus:bg-secondary-100 focus:text-primary-100"
          >
            <option className="bg-secondary-100 text-white-100 " value="desc">
              Desc
            </option>
            <option className="bg-secondary-100 text-white-100 " value="asc">
              Asc
            </option>
          </select>

          <div
            onClick={() => setIsOpenMenu(true)}
            className="text-primary-100 sm:text-lg lg:text-xl flex items-center gap-x-1 cursor-pointer"
          >
            Filters <IoAdd />
          </div>
        </div>
        {/* modal menu */}
        <div
          className={`${
            isOpenMenu ? "visible opacity-100" : " invisible opacity-0"
          } fixed container mx-auto 2xl:max-w-6xl h-screen z-40 inset-0 transition-all overflow-y-auto`}
        >
          {/* menu */}
          <div
            className={`${
              isOpenMenu ? "w-3/4 sm:w-1/4 translate-x-0" : "w-0 translate-x-96"
            } relative bg-white-95 h-screen z-40 inset-0 transition-all ease-in-out duration-500 float-right`}
          >
            {/* title menu */}
            <div className="w-full flex justify-between items-center px-6 py-4 border-b-[1px] border-secondary-100 border-opacity-25">
              <h2 className="text-2xl cursor-pointer">Filters</h2>
              <button onClick={() => setIsOpenMenu(false)}>
                <IoClose className="text-xl font-bold hover:rotate-90 transition-all" />
              </button>
            </div>
            {/* time period menu */}
            <div
              className={`${
                openAcc === "TimePeriod"
                  ? "h-1/2"
                  : "h-16 border-b-[1px] border-secondary-100 border-opacity-25"
              } w-full overflow-y-scroll relative transition-all`}
            >
              <h2
                onClick={() => toggleAcc("TimePeriod")}
                className="fixed bg-white-95  px-6 py-4 w-full flex items-center justify-between cursor-pointer"
              >
                Time Period
                <IoIosArrowDown
                  className={`${
                    openAcc === "TimePeriod" && "rotate-180"
                  } transition-all`}
                />
              </h2>
              <ul
                className={`${
                  openAcc === "TimePeriod" ? "block" : "hidden"
                } mt-14`}
              >
                {supportedTimeFormats.map((t) => (
                  <li
                    onClick={() => onSelectFilter("TimePeriod", t.timePeriod)}
                    key={t.id}
                    className={`${
                      timePeriod === t.timePeriod && "bg-secondary-600"
                    } px-4 py-2 sm:px-5 sm:py-4 text-base sm:text-lg cursor-pointer`}
                  >
                    {t.fullTimeName}
                  </li>
                ))}
              </ul>
            </div>

            {/* order by */}
            <div
              className={`${
                openAcc === "OrderBy"
                  ? "h-1/2"
                  : "h-16 border-b-[1px] border-secondary-100 border-opacity-25"
              } w-full overflow-y-scroll relative transition-all`}
            >
              <h2
                onClick={() => toggleAcc("OrderBy")}
                className="fixed bg-white-95  px-6 py-4 w-full flex items-center justify-between cursor-pointer"
              >
                Order By
                <IoIosArrowDown
                  className={`${
                    openAcc === "OrderBy" && "rotate-180"
                  } transition-all`}
                />
              </h2>
              <ul
                className={`${
                  openAcc === "OrderBy" ? "block" : "hidden"
                } mt-14`}
              >
                {allowedOrders.map((order) => (
                  <li
                    onClick={() => onSelectFilter("OrderBy", order.orderType)}
                    key={order.id}
                    className={`${
                      orderBy === order.orderType && "bg-secondary-600"
                    } px-4 py-2 sm:px-5 sm:py-4 text-base sm:text-lg cursor-pointer`}
                  >
                    {order.orderType}
                  </li>
                ))}
              </ul>
            </div>

            {/* allowed tags */}
            <div
              className={`${
                openAcc === "Tags"
                  ? "h-1/2"
                  : "h-14 border-b-[1px] border-secondary-100 border-opacity-25"
              } w-full overflow-y-auto transition-all`}
            >
              <h2
                onClick={() => toggleAcc("Tags")}
                className="fixed bg-white-95  px-6 py-4 w-full flex items-center justify-between cursor-pointer"
              >
                Tags
                <IoIosArrowDown
                  className={`${
                    openAcc === "Tags" && "rotate-180"
                  } transition-all`}
                />
              </h2>
              <div
                className={`flex flex-wrap justify-start transition-all py-3`}
              >
                {allowedTags.map((tag) => (
                  <button
                    onClick={() => onSelectFilter("Tags", tag.tagType)}
                    key={tag.id}
                    className={`${
                      selectedTags(tag.tagType) === tag.tagType
                        ? "bg-primary-100 text-secondary-100"
                        : "bg-secondary-100 text-white-100"
                    } m-1 rounded-full flex items-center gap-x-2`}
                  >
                    <p className="text-sm text-left p-2 rounded-full">
                      {tag.tagType}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* modal background */}
          <div
            onClick={() => setIsOpenMenu(false)}
            className="bg-secondary-100 fixed bg-opacity-80 w-full h-full text-white-90 z-0"
          ></div>
        </div>
      </div>
    </div>
  );
}
