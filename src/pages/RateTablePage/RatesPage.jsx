import { BiArrowBack } from "react-icons/bi";
import CoinStory from "./CoinsStorySection/CoinsStroySection";
import { useCoinsData } from "../../components/Context/CoinsContext";
import { useEffect, useState } from "react";
import { uuids } from "../../constants";
import RateFilterSection from "./RateFilterSection/RateFilterSection";
import RatesTableSection from "./RatesTableSection/RatesTableSection";
import { Link } from "react-router-dom";

function RatesPage() {
  const [filters, setFilters] = useState({
    TimePeriod: "24h",
    OrderBy: "price",
    Tags: [],
    OrderDir: "desc",
  });
  // check tags array
  const isSelectedTag = (tag) => filters.Tags.find((t) => t === tag);

  // get api request function from coins context
  const { getCoinsRateHandler } = useCoinsData();

  // send request api on each filter change
  useEffect(() => {
    const tagsQuery = filters.Tags.map((t) => `tags[]=${t}&`);

    getCoinsRateHandler(
      `/coins?${uuids.getUIDList(20)}timePeriod=${filters.TimePeriod}&orderBy=${
        filters.OrderBy
      }&${tagsQuery}&orderDirection=${filters.OrderDir}`,
      import.meta.env.VITE_COINRANK_BASAE_URL
    );
  }, [filters]);

  // change filter state on menu events
  const changeFilterHandle = (filterType, filterValue) => {
    // toggle (add or remove) tags from state
    if (filterType === "Tags") {
      setFilters((prev) => {
        return {
          ...prev,
          Tags: isSelectedTag(filterValue)
            ? prev.Tags.filter((t) => t !== filterValue)
            : [...prev.Tags, filterValue],
        };
      });
    } else {
      // set state with property's key
      setFilters((prev) => {
        console.log(prev[filterType]);
        return { ...prev, [filterType]: filterValue };
      });
    }
  };

  return (
    <div>
      <HeroSection />
      <RateFilterSection
        onSelectFilter={changeFilterHandle}
        selectedTags={isSelectedTag}
        timePeriod={filters.TimePeriod}
        orderBy={filters.OrderBy}
      />
      <CoinStory timePeriod={filters.TimePeriod} />
      <RatesTableSection />
    </div>
  );
}

export default RatesPage;

function HeroSection() {
  return (
    <div className="container mx-auto 2xl:max-w-6xl">
      <div
        id="wrapper"
        className="w-full flex flex-col items-start px-5 py-2 sm:px-16 gap-y-2"
      >
        <h2 className="text-2xl text-primary-100 text-left leading-8 sm:leading-8 font-semibold">
          Be aware of the latest <br /> exchange rate you want
        </h2>
        <p className="text-sm text-white-95 leading-[20px] text-left">
          Easily select the time frame you want and find out about the price of
          the currency you want. <br /> Click on each currency to enter its
          details page
        </p>
        <div className="w-full sm:w-fit flex gap-x-3 my-2">
          <Link to="/Your-Currency/">
            <button className="bg-primary-100 rounded-xl px-3 py-2 text-base flex items-center gap-x-1">
              HomePage <BiArrowBack className="rotate-180 text-lg" />
            </button>
          </Link>
          <Link to="/Your-Currency/topCharts">
            <button className="bg-secondary-600 rounded-xl px-3 py-2 text-base">
              Top Chart's
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
