import { useNavigate } from "react-router-dom";
import { changePriceFormat } from "../../../utils";
import { BiError } from "react-icons/bi";

function CoinCardList({ coins, status }) {
  if (status === "loading")
    return (
      <div className="container mx-auto 2xl:max-w-6xl h-screen flex items-center justify-center">
        <p className="text-primary-100 text-lg animate-pulse">Loading ...</p>
      </div>
    );

  if (status === "no results")
    return (
      <div className="container mx-auto 2xl:max-w-6xl h-52 md:h-screen flex justify-center items-center px-4">
        <h1 className="text-white-100 flex justify-center items-center">
          <BiError className="text-4xl mx-2" /> there is nothing mathed with
          your search...
        </h1>
      </div>
    );

  if (coins && status !== "loading")
    return (
      <div className="container mx-auto my-6 2xl:max-w-6xl">
        <div
          id="wrapper"
          className="w-full md:px-4 md:py-2 flex flex-col md:flex-row md:flex-wrap justify-evenly items-center gap-y-4 gap-x-2"
        >
          {/* single coin component */}
          {coins.map((c) => (
            <SingleCoinCard key={c.name} coinDetail={c} />
          ))}
        </div>
      </div>
    );
}

function SingleCoinCard({ coinDetail }) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-secondary-300 rounded-md relative px-5 py-3 w-3/4 md:w-1/4 md:h-full flex flex-col gap-y-2`}
    >
      <div className="w-full">
        <img
          src={coinDetail.iconUrl}
          alt={coinDetail.name}
          className="h-20 w-20 object-center bg-red-50 rounded-full p-1"
        />
      </div>

      <div className="text-white-90 bg-secondary-100 bg-opacity-10 px-2 py-1">
        <h2 className="font-semibold line-clamp-1">Name : {coinDetail.name}</h2>
        <p className="line-clamp-1">Symbol : {coinDetail.symbol}</p>
        <p className="line-clamp-1">
          Last Price : ${changePriceFormat(coinDetail.price)}
        </p>
      </div>

      <button
        onClick={() => navigate(`/Your-Currency/singleCoin/${coinDetail.uuid}`)}
        className="text-secondary-100 bg-white-100 hover:bg-secondary-100 hover:text-white-100 transition-all px-2 py-1 rounded-lg"
      >
        Show Details
      </button>
    </div>
  );
}

export default CoinCardList;
