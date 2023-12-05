import { IoMdOpen } from "react-icons/io";
import { changePriceFormat } from "../../utils";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaTrash } from "react-icons/fa";

export default function LastPositions({ positionsData, isAuthenticated }) {
  if (!isAuthenticated)
    return (
      <div className="px-3 py-2 rounded-xl bg-secondary-600">
        <h2 className="text-lg text-secondary-100 text-left my-2">
          Your Last Position's :
        </h2>

        <div className="h-36 w-full flex flex-col items-center justify-center px-2">
          <p>To create a new position, please log in to your account</p>
          <Link
            to="/Your-Currency/login"
            className="px-4 py-2 bg-secondary-100 text-white-100 rounded-md my-2"
          >
            Login
          </Link>
        </div>
      </div>
    );

  if (!positionsData || !positionsData.length)
    return (
      <div className="px-3 py-2 rounded-xl bg-secondary-600">
        <h2 className="text-lg text-secondary-100 text-left my-2">
          Your Last Position's :
        </h2>

        <div className="h-36 w-full flex flex-col items-center justify-center px-2">
          <p>You have not created a new position yet</p>
        </div>
      </div>
    );

  if (positionsData && isAuthenticated && positionsData.length > 0)
    return (
      <div className="px-3 py-2 rounded-xl bg-secondary-600">
        <h2 className="text-lg text-secondary-100 text-left my-2">
          Your Last Position's :
        </h2>
        {/* wrapper  */}
        <div className="w-full flex flex-col items-center gap-y-5 overflow-y-auto h-56 ">
          {positionsData.length &&
            positionsData.map((pos, index) => (
              <PositionCard key={index} posData={pos} />
            ))}
        </div>
      </div>
    );
}

function PositionCard({ posData, status }) {
  const { deletePosition } = useAuth();

  return (
    <div className="bg-primary-100 px-4 py-2 rounded-xl w-5/6 mx-auto shadow-md shado shadow-secondary-600 hover:shadow-secondary-500 transition-all">
      <p className="w-full flex justify-between items-center text-secondary-100">
        <span className="line-clamp-1">{posData.positionName}</span>
        <Link to={`/Your-Currency/singleCoin/${posData.coinId}`}>
          <IoMdOpen className="text-xl" />
        </Link>
      </p>
      <h2 className="text-center text-lg font-bold my-2 text-secondary-100">
        <span>price : ${changePriceFormat(posData.price)}</span>
        <br />
        <span className="text-sm -mt-3">at :{posData.selectedTime}</span>
      </h2>
      <span className="text-sm">
        on
        <strong>&nbsp;{posData.coinName}</strong>
      </span>
      <span
        onClick={() => deletePosition(posData.positionId)}
        className="text-xl font-bold float-right"
      >
        <FaTrash className="text-red-800" />
      </span>
    </div>
  );
}
