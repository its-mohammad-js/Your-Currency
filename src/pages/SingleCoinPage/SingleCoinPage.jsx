import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoinsData } from "../../components/Context/CoinsContext";
import { changePriceFormat } from "../../utils";
import SimpleLineChart from "../../components/Charts/LineChart/SimpleLineChart";
import SimpleBarChart from "../../components/Charts/BarChart/SimpleBarChart";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { supportedTimeFormats } from "../../constants";
import SingleCoinPageLoader from "../../components/LoadingComponents/SingleCoinPageLoader";
import { useAuth } from "../../components/Context/AuthContext";
import toast from "react-hot-toast";

function SingleCoinPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { saveNewPos, isAuthenticated } = useAuth();
  const [modalOpen, setModalopen] = useState(false);
  //   selected position on line chart info
  const [positionInfo, setPositionInfo] = useState({});
  // set name and description on add position modal
  const [formValues, setFormValues] = useState({
    posName: "",
    posSummary: "",
  });
  // time period filter value's
  const [timePeriod, setTimePeriod] = useState("1y");
  // get api function's from coin context
  const {
    coinsData: { isLoading, rateListData },
    getCoinsRateHandler,
    getCoinPriceHistory,
  } = useCoinsData();

  // send request api for currency infomation
  useEffect(() => {
    getCoinsRateHandler(
      `/coins?uuids[]=${params.id}`,
      import.meta.env.VITE_COINRANK_BASAE_URL
    );
  }, []);

  // send request to api for price history
  useEffect(() => {
    getCoinPriceHistory(
      `/coin/${params.id}/history?timePeriod=${timePeriod}`,
      timePeriod
    );
  }, [timePeriod]);

  //   change time period filter
  const changeTimePeriodHandler = (e) => {
    setTimePeriod(e.target.value);
  };

  //   set postion infomation with line chart
  const addPostionHandler = (pos) => {
    // create new position
    const newPos = {
      color: pos[0].color,
      coinName: rateListData.coins[0].name,
      coinId: rateListData.coins[0].uuid,
      selectedTime: pos[0].payload.time,
      price: pos[0].payload.highestPrice,
    };

    setPositionInfo(newPos);
  };
  //   save selected position
  function sumbitPosition(e) {
    e.preventDefault();

    setModalopen(false);
    setPositionInfo({});
    setFormValues({
      posName: "",
      posSummary: "",
    });

    if (isAuthenticated) {
      saveNewPos({
        ...positionInfo,
        positionName: formValues.posName,
        positionDetail: formValues.posSummary,
        createdAt: new Date(),
        positionId: `${new Date()}-${Math.ceil(Math.random() * 10000)}`,
      });
    } else if (!isAuthenticated) {
      toast.error("You are not logged in yet");
      return;
    }

    toast.success("Position Added");
  }

  if (isLoading) return <SingleCoinPageLoader />;

  if (!isLoading && rateListData.coins)
    return (
      <div className="container mx-auto 2xl:max-w-6xl relative">
        {/* header */}
        <div className="flex flex-col md:flex-row px-3 py-2">
          {/* header image */}
          <div className="bg-secondary-200 rounded-md h-56 flex justify-center items-center md:w-1/3 py-2">
            <img
              src={rateListData.coins[0].iconUrl}
              alt={rateListData.coins[0].name}
              className="h-full w-full object-contain animate-fade-in"
            />
          </div>
          {/* header description */}
          <div className="flex-1 bg-primary-100 px-2 py-1 md:px-4 md:py-2 rounded-md">
            <h2 className="text-center text-lg my-1 font-semibold">
              {rateListData.coins[0].name}
            </h2>
            <div className="flex flex-col gap-y-2 md:gap-y-3 my-4">
              <p>
                <strong>Last Change :</strong> {rateListData.coins[0].change}
              </p>
              <p>
                <strong>Last Price :</strong> $
                {changePriceFormat(rateListData.coins[0].price)}
              </p>
              <p>
                <strong>Btc Price :</strong> {rateListData.coins[0].btcPrice}
              </p>
            </div>
            <div className="w-full flex items-center justify-center md:justify-start md:items-end">
              <button
                onClick={() => navigate("/Your-Currency/search")}
                className="bg-secondary-100 text-white-100 hover:bg-white-100 hover:text-secondary-100 transition-all px-4 py-2 rounded-md"
              >
                back to search
              </button>
            </div>
          </div>
        </div>
        {/* charts section */}
        <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2 w-full justify-between px-3 py-2">
          {/* simple bar chart */}
          <div className="bg-secondary-600 rounded-md pr-8 py-2 md:w-1/2 md:flex md:items-center">
            <SimpleBarChart
              primaryColor={"#191919"}
              secondayColor={"#CAFF33"}
            />
          </div>
          {/*  line chart and time period filter */}
          <div className="bg-secondary-400 rounded-md pr-8 py-2 md:w-1/2">
            <div className="w-full mx-5 flex justify-between py-2">
              <select
                onChange={changeTimePeriodHandler}
                name="timePeriod"
                value={timePeriod}
                className="px-2 py-1 rounded-md bg-secondary-100 text-primary-100 outline-none"
              >
                {supportedTimeFormats.map((time) => (
                  <option key={time.id} value={time.timePeriod}>
                    {time.fullTimeName}
                  </option>
                ))}
              </select>

              <button
                disabled={!positionInfo.price}
                onClick={() => setModalopen(true)}
                className="bg-primary-100 text-secondary-100 mx-4 my-1 px-2 py-1 rounded-md disabled:bg-secondary-600 "
              >
                Add Position
              </button>
            </div>

            <SimpleLineChart
              addPosition={addPostionHandler}
              primaryColor={"#F7F7F8"}
              secondayColor={"#CAFF33"}
            />
          </div>
        </div>
        {/* add position modal */}
        <div
          className={`${
            modalOpen ? "fixed" : "hidden"
          } h-screen z-50 w-screen inset-0 container mx-auto 2xl:max-w-6xl flex justify-center items-center transition-all`}
        >
          {/* main form */}
          <div className="w-11/12 md:w-2/3 bg-primary-100 z-10 absolute rounded-xl">
            <form
              onSubmit={(e) => sumbitPosition(e)}
              className="flex flex-col items-center justify-between p-4"
            >
              {/* form header (selected position detail) */}
              <div className="bg-secondary-100 text-white-100 w-11/12 p-3 rounded-xl">
                <h2>
                  New Position On :&nbsp;
                  <strong>{rateListData.coins[0].name}</strong>
                </h2>
                <p>
                  Selected Date : <strong>{positionInfo.selectedTime}</strong>
                </p>
                <p>
                  Last Price :&nbsp;
                  <strong>${changePriceFormat(positionInfo.price)}</strong>
                </p>
              </div>
              {/* form inputs (name and description) */}
              <div
                id="formControl"
                className="w-11/12 flex flex-col px-4 py-2 my-4"
              >
                <label
                  htmlFor="posName"
                  className="font-semibold sm:text-lg my-2"
                >
                  Position Name :
                </label>
                <input
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={formValues.posName}
                  type="text"
                  name="posName"
                  id="posName"
                  placeholder="ex: invest on bitcoin"
                  className="bg-secondary-600 p-2 rounded-md placeholder:text-secondary-100 outline-none"
                />
                <label
                  htmlFor="posSummary"
                  className="font-semibold sm:text-lg my-2"
                >
                  Summary detail :
                </label>
                <textarea
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={formValues.posSummary}
                  name="posSummary"
                  id="posSummary"
                  maxLength={40}
                  cols="5"
                  rows="5"
                  placeholder="type some details"
                  className="bg-secondary-600 p-2 rounded-md placeholder:text-secondary-100 resize-none outline-none"
                ></textarea>
              </div>
              {/* form buttons */}
              <div className="w-full flex items-center justify-between px-4">
                <button
                  type="button"
                  onClick={() => {
                    setPositionInfo({});
                    setModalopen(false);
                  }}
                  className="bg-secondary-600 text-secondary-100 flex gap-x-2 items-center p-3 rounded-md"
                >
                  Close <IoMdClose />
                </button>
                <button
                  type="submit"
                  className="bg-secondary-100 text-white-90 flex gap-x-2 items-center p-3 rounded-md"
                >
                  Submit <FaCheck />
                </button>
              </div>
            </form>
          </div>
          {/* modal background */}
          <div
            onClick={() => setModalopen(false)}
            className="w-full h-full bg-secondary-100 opacity-80 z-[-1]"
          ></div>
        </div>
      </div>
    );
}

export default SingleCoinPage;
