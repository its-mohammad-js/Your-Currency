import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { changePriceFormat } from "../../utils";

function SingleCoinDetail({ name, iconUrl, change, symbol, price }) {
  const changeArrow = Number(change) > 0;

  return (
    <div className="flex items-center sm:text-base py-2 px-3 bg-secondary-300 bg-opacity-50 border-l-8 border-b-[1px] border-primary-100 text-white-99">
      <div className="flex items-center text-xs sm:text-base gap-x-2 w-1/3 h-12">
        <img src={iconUrl} alt={name} className="w-6 object-contain" />
        <p className="whitespace-nowrap line-clamp-1 sm:line-clamp-2">
          {name}
          <br />
          <span className="hidden sm:block">{symbol}</span>
        </p>
      </div>

      <div className="w-1/3 flex items-center justify-center">
        <p className="text-sm sm:text-base w-10 mr-2">
          ${changePriceFormat(price)}
        </p>
      </div>

      <div className="w-1/3 flex justify-end">
        <p
          className={`${
            changeArrow ? "text-green-700" : "text-red-700"
          }  flex items-center gap-x-2`}
        >
          <span className="text-sm">
            {changeArrow ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </span>
          {change}
        </p>
      </div>
    </div>
  );
}

export default SingleCoinDetail;
