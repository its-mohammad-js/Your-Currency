import React from "react";
import { BarChartLoader, LineChartLoader } from "./ChartsLoader";

function SingleCoinPageLoader() {
  return (
    <div className="container mx-auto 2xl:max-w-6xl relative">
      {/* header */}
      <div className="flex flex-col md:flex-row px-3 py-2">
        {/* header image */}
        <div className="bg-secondary-200 rounded-md h-56 flex justify-center items-center md:w-1/3 py-2 animate-pulse">
          <div className="h-40 w-40 rounded-full bg-secondary-600 animate-pulse"></div>
        </div>
        {/* header description */}
        <div className="flex-1 flex flex-col gap-y-2 bg-secondary-400 px-2 py-1 md:px-4 md:py-2 rounded-md animate-pulse">
          <span className="bg-secondary-600 px-6 py-3 rounded-md animate-pulse w-2/3"></span>
          <span className="bg-secondary-600 px-6 py-3 rounded-md animate-pulse w-4/5"></span>
          <span className="bg-secondary-600 px-6 py-3 rounded-md animate-pulse w-2/4"></span>
          <span className="bg-secondary-600 px-6 py-3 rounded-md animate-pulse w-4/5"></span>
        </div>
      </div>
      {/* charts section */}
      <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2 w-full justify-between px-3 py-2">
        {/* simple bar chart */}
        <div className="bg-secondary-600 rounded-md pr-8 md:px-4 py-2 md:w-1/2 md:flex md:items-center">
          <BarChartLoader />
        </div>
        {/*  line chart and time period filter */}
        <div className="bg-secondary-400 rounded-md pr-8 md:px-4 py-2 md:w-1/2">
          <LineChartLoader />
        </div>
      </div>
    </div>
  );
}

export default SingleCoinPageLoader;
