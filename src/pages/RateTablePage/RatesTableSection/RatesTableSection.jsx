import { useCoinsData } from "../../../components/Context/CoinsContext";
import RatesTableLoader from "../../../components/LoadingComponents/RatesTableLoader";
import SingleCoinDetail from "/src/components/CoinRowDetail/SingleCoinDetail";

function RatesTableSection() {
  // get rate list data from Coin Context and status
  const {
    coinsData: { isLoading, rateListData },
  } = useCoinsData();

  if (isLoading) return <RatesTableLoader height={20} />;

  if (!isLoading && rateListData && rateListData.coins)
    return (
      <div className="bg-red-50 container 2xl:max-w-6xl mx-auto">
        <div id="wrapper" className="w-full mt-4 bg-secondary-100">
          <div className="sm:px-4 flex-1">
            <div className="bg-secondary-300 flex justify-between px-4 py-2">
              <p className="text-white-90 w-1/3 flex justify-start">
                All Coins
              </p>
              <p className="text-white-90 w-1/3 flex justify-center">Price</p>
              <p className="text-white-90 w-1/3 flex justify-end">24h</p>
            </div>
            <div>
              {rateListData.coins.map((coin) => (
                <SingleCoinDetail key={Math.random() * 10} {...coin} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default RatesTableSection;
