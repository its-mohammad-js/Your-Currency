import { BiBitcoin, BiPlus } from "react-icons/bi";
import { FaDollarSign, FaEthereum, FaEuroSign } from "react-icons/fa";

import RateForm from "../../../components/RateForm/RateForm";

function HomePageHero() {
  return (
    // hero section
    <div className="mt-4 md:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center mx-auto container 2xl:max-w-6xl">
      {/* hero section title */}
      <div className="sm:w-1/2 flex flex-col gap-2 justify-center items-center sm:items-start p-3 md:px-8">
        <div
          id="hero__badge"
          className="bg-secondary-200 flex justify-center gap-x-1 items-center px-2 py-1 rounded-2xl w-5/6 sm:w-auto"
        >
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              fill="none"
            >
              <path
                fill="#CAFF33"
                fillRule="evenodd"
                d="M7.67 3.166c.686-.79 1.7-1.291 2.83-1.291 1.13 0 2.144.5 2.83 1.29a3.742 3.742 0 0 1 2.915 1.09c.8.8 1.163 1.87 1.09 2.914.79.687 1.29 1.7 1.29 2.831 0 1.13-.5 2.144-1.29 2.831a3.743 3.743 0 0 1-1.09 2.914c-.8.8-1.87 1.162-2.914 1.09-.687.79-1.7 1.29-2.831 1.29-1.13 0-2.144-.5-2.83-1.29a3.742 3.742 0 0 1-2.916-1.09c-.799-.8-1.162-1.87-1.089-2.914A3.742 3.742 0 0 1 2.375 10c0-1.13.5-2.144 1.29-2.83a3.742 3.742 0 0 1 1.09-2.915c.8-.8 1.87-1.162 2.914-1.09Zm5.839 5.322a.625.625 0 1 0-1.018-.726l-2.696 3.774-1.353-1.353a.625.625 0 1 0-.884.884l1.875 1.875a.625.625 0 0 0 .95-.079l3.126-4.375Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="text-secondary-600 text-xs sm:text-base flex-1 whitespace-nowrap">
            No LLC Required, No Credit Check.
          </p>
        </div>
        <div
          id="hero__title"
          className="flex flex-col items-center sm:items-start justify-center gap-y-1"
        >
          <h2 className="text-2xl text-white-100 text-center sm:text-left leading-8 sm:leading-8 p-1 font-semibold">
            Welcome to YourCurrency <br /> Empowering Your <br />
            <span className="text-primary-100">Financial Journey</span>
          </h2>
          <p className="text-center text-sm text-white-95 leading-[20px] sm:text-left">
            At YourCurrency, our mission is to provide comprehensive banking
            solutions that empower individuals and businesses to achieve their
            financial goals. We are committed to delivering personalized and
            innovative services that prioritize our customers' needs.
          </p>
        </div>
      </div>
      {/* hero section rate form */}
      <div className="sm:w-1/2 relative px-2">
        <img
          src="./images/Abstract-hero.svg"
          alt="Abstract-hero"
          className="absolute right-0 top-0 w-1/2 z-[-1] animate-fade-in"
        />

        <div
          id="form__badge"
          className="bg-[#22251b] w-40 rounded-lg px-3 py-2 flex items-center justify-center gap-x-2 absolute top-5 md:top-6 md:left-10"
        >
          <span className="bg-primary-100 rounded-full p-2">
            <BiPlus className="text-lg" />
          </span>
          <p className="text-white-90 leading-4 font-semibold text-sm flex-1">
            + $5,000 <br />
            <span className="font-thin text-xs">Income</span>
          </p>
        </div>

        <div
          id="form__rate-form"
          className="w-11/12 md:w-4/5 lg:w-2/3 mx-auto mt-14"
        >
          <RateForm />
        </div>

        <div
          id="form__supported-currency"
          className="float-right bg-[#22251b] flex justify-between items-center px-2 py-2 rounded-2xl gap-x-2 mt-4"
        >
          <p className="text-xs text-white-90">Supported Currency</p>
          <div className="flex items-center justify-between gap-x-1 bg-secondary-100 px-2 py-2 rounded-full">
            <span className="bg-secondary-200 text-xs p-[3px] rounded-full">
              <BiBitcoin className="text-primary-100" />
            </span>
            <span className="bg-secondary-200 text-xs p-[3px] rounded-full">
              <FaEthereum className="text-primary-100" />
            </span>
            <span className="bg-secondary-200 text-xs p-[3px] rounded-full">
              <FaDollarSign className="text-primary-100" />
            </span>
            <span className="bg-secondary-200 text-xs p-[3px] rounded-full">
              <FaEuroSign className="text-primary-100" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageHero;
