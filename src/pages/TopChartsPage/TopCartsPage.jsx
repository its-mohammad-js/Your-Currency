import {
  FaBitcoin,
  FaDollarSign,
  FaEthereum,
  FaEuroSign,
} from "react-icons/fa";
import MainChartsSection from "./MainChartsSection/MainChartsSection";
import { Link } from "react-router-dom";

function TopCartsPage() {
  return (
    <>
      <HeroSection />
      <MainChartsSection />
    </>
  );
}

export default TopCartsPage;

function HeroSection() {
  return (
    <div className="container 2xl:max-w-6xl mx-auto relative">
      <div className="absolute right-0 z-[-1] h-full">
        <img
          src="./images/mobilePic.png"
          alt="mobilepic"
          className="max-w-full h-full animate-fade-in"
        />
      </div>
      <div id="wrapper" className="w-full sm:px-10 sm:py-5">
        <div className="sm:w-2/5">
          <div className="">
            <h2 className="text-2xl text-white-100 text-center sm:text-left leading-8 sm:leading-8 p-1 font-semibold">
              Top &nbsp;
              <span className="text-primary-100">
                Cryptocurrencies of the Week:
              </span>
              &nbsp;{" "}
              <span className="bg-secondary-100">
                See What's Trending in the Crypto Charts!
              </span>
            </h2>
            <p className="text-center text-sm text-white-95 hidden sm:block leading-[20px] sm:text-left">
              Discover the Hottest Cryptocurrencies and Track Their Performance
              in Real-time
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-2 py-2">
            <Link
              to="/Your-Currency/"
              className="bg-secondary-100 hover:bg-primary-300 hover:text-secondary-100 transition-all w-3/5 px-4 py-2 text-center border-[1px] border-primary-100 text-primary-100 rounded-md"
            >
              HomePage
            </Link>
            <Link
              to="/Your-Currency/rates"
              className="bg-primary-100 hover:bg-secondary-300 hover:text-primary-100 transition-all w-2/5 px-4 py-2 text-center border-[1px] border-secondary-100 text-secondary-100 rounded-md"
            >
              Rates Page
            </Link>
          </div>
          <div className="flex justify-evenly items-center py-2">
            <div className="bg-secondary-200 rounded-md p-2">
              <FaBitcoin className="text-4xl text-yellow-500" />
            </div>
            <div className="bg-secondary-200 rounded-md p-2">
              <FaEthereum className="text-4xl text-slate-600" />
            </div>
            <div className="bg-secondary-200 rounded-md p-2">
              <FaDollarSign className="text-4xl text-green-700" />
            </div>
            <div className="bg-secondary-200 rounded-md p-2">
              <FaEuroSign className="text-4xl text-pink-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
