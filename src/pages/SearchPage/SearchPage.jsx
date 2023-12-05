import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import CoinCardList from "./CoinCardList/CoinCardList";
import axios from "axios";
import toast from "react-hot-toast";

function SearchPage() {
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState("nothing");

  // send request api on each filter change
  useEffect(() => {
    searchCoins("");
  }, []);

  async function searchCoins(coinName) {
    setStatus("loading");
    try {
      const {
        data: { data },
      } = await axios.get(
        `${
          import.meta.env.VITE_COINRANK_BASAE_URL
        }/search-suggestions?query=${coinName}`,
        {
          headers: {
            "x-access-token": import.meta.env.VITE_COINRANKK_API_KEY,
          },
        }
      );

      setCoins(data.coins);
      // set status to not found
      if (data.coins.length === 0) setStatus("no results");
      // set status to normal state
      if (data.coins.length > 0) setStatus("nothing");
    } catch (error) {
      toast.error(error.message);
      setStatus("nothing");
    }
  }

  return (
    <>
      <HeroSection searchCoins={searchCoins} />
      <CoinCardList coins={coins} status={status} />
    </>
  );
}

export default SearchPage;

function HeroSection({ searchCoins }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="container mx-auto 2xl:max-w-6xl relative">
      <div className="w-full md:w-2/3 px-4 md:mx-auto md:flex md:flex-col ">
        {/* coin picture */}
        <div className="md:absolute inset-0 animate-fade-in z-[-1]">
          <img
            src="./images/BitCoin.png"
            alt="bitcoin-bg-pic"
            className="max-h-full animate-fade-in"
          />
        </div>
        {/* header title */}
        <div className="w-full">
          <div className="w-56 mx-auto my-3 flex items-center justify-center">
            <h2 className="text-primary-100 sm:text-lg md:text-xl  font-semibold text-lg text-center animate-typing whitespace-nowrap overflow-hidden w-0">
              Search Between Coin's&nbsp;
            </h2>
            <span className="bg-white-100 animate-pulse">&nbsp;</span>
          </div>

          <p className="text-white-100 bg-secondary-100 bg-opacity-75 text-center md:text-start">
            Find your desired coin among all digital currencies and view its
            information and latest news
          </p>
        </div>
        {/* search bar */}
        <div className="w-full flex justify-center items-center pl-6 py-5">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="p-2 md:p-3 bg-white-100 rounded-l-full outline-none md:w-2/4"
            placeholder="Search Coin's"
          />
          <button
            onClick={() => searchCoins(searchText)}
            className="bg-primary-100 px-6 py-3 md:py-4 rounded-full relative right-8"
          >
            <BiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
