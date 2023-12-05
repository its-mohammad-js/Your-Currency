import { useEffect, useState } from "react";
import { useCoinsData } from "../../../components/Context/CoinsContext";
import { supportedTimeFormats, uuids } from "../../../constants";
import SimpleBarChart from "../../../components/Charts/BarChart/SimpleBarChart";
import SimpleLineChart from "../../../components/Charts/LineChart/SimpleLineChart";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { changePriceFormat } from "../../../utils";
import { useAuth } from "../../../components/Context/AuthContext";
import toast from "react-hot-toast";
import LastPositions from "../../../components/LastPositions/PositionCard";

function MainChartsSection() {
  const [chartFilter, setChartFilter] = useState({
    timePeriod: "1y",
    coinDetail: { name: "bitcoin", id: "Qwsogvtv82FCd" },
  });
  // get user data from auth context
  const { saveNewPos, isAuthenticated, positionsData } = useAuth();
  // save selected position from line chart
  const [selectedPos, setSelectedPos] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // set name and description on add position modal
  const [formValues, setFormValues] = useState({
    posName: "",
    posSummary: "",
  });

  // get api request function from coin context
  const { getCoinPriceHistory } = useCoinsData();

  // send request to api on filter change's
  useEffect(() => {
    getCoinPriceHistory(
      `/coin/${chartFilter.coinDetail.id}/history?timePeriod=${chartFilter.timePeriod}`,
      chartFilter.timePeriod
    );
  }, [chartFilter]);

  // change filter state
  function changeFilterHandler(e) {
    setChartFilter((prev) => ({
      ...prev,
      [e.target.name]: JSON.parse(e.target.value),
    }));
    // clear selected position on filter changes
    setSelectedPos({});
  }
  // set selected position
  function addPosition(pos) {
    // create new position
    const newPos = {
      coinName: chartFilter.coinDetail.name,
      coinId: chartFilter.coinDetail.id,
      selectedTime: pos[0].payload.time,
      price: pos[0].payload.highestPrice,
    };

    setSelectedPos(newPos);
  }
  // submit position to profile
  function sumbitPosition(e) {
    e.preventDefault();

    setModalIsOpen(false);
    setSelectedPos({});
    setFormValues({
      posName: "",
      posSummary: "",
    });

    if (isAuthenticated) {
      saveNewPos({
        ...selectedPos,
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

  return (
    <div className="container 2xl:max-w-6xl mx-auto relative">
      <div id="wrapper" className="w-full flex flex-col gap-y-4 px-2 py-2">
        {/* line chart */}
        <div className="bg-secondary-200 rounded-2xl px-2">
          {/* main filters */}
          <div className="px-3 py-2">
            <div className="flex flex-col text-primary-100">
              <h2 className="font-semibold my-2">
                Last Changes Of&nbsp;
                <select
                  name="coinDetail"
                  onChange={changeFilterHandler}
                  className="bg-primary-100 text-secondary-100 text-sm p-1 rounded-full"
                >
                  {uuids.listOfCoins.map((c, index) => {
                    if (index < 5)
                      return (
                        <option
                          value={JSON.stringify({ id: c.id, name: c.name })}
                          key={c.id}
                        >
                          {c.name}
                        </option>
                      );
                  })}
                </select>
                &nbsp; :
              </h2>
              <p className="text-xs opacity-80">
                see price histroy of top currency's
              </p>
            </div>
            <div className="w-full flex justify-between my-3">
              <select
                name="timePeriod"
                onChange={changeFilterHandler}
                defaultValue={JSON.stringify("1y")}
                className="bg-primary-100 text-secondary-100 rounded-full p-1"
              >
                {supportedTimeFormats.map((t) => (
                  <option
                    key={t.id}
                    value={JSON.stringify(t.timePeriod)}
                    className="bg-secondary-100 text-primary-100"
                  >
                    {t.fullTimeName}
                  </option>
                ))}
              </select>

              <button
                disabled={!selectedPos.price}
                onClick={() => setModalIsOpen(true)}
                className={`text-primary-300 flex items-center gap-x-1 text-sm p-1.5 hover:bg-secondary-400 rounded-full disabled:bg-secondary-600 disabled:text-secondary-100 disabled:opacity-40`}
              >
                Add New Position <FaPlus />
              </button>
            </div>
          </div>
          {/* main line chart  */}
          <div className="pr-10 sm:px-6">
            <SimpleLineChart
              addPosition={addPosition}
              primaryColor={"#F7F7F8"}
              secondayColor={"#CAFF33"}
            />
          </div>
        </div>
        {/* last positions */}
        <LastPositions
          positionsData={positionsData}
          isAuthenticated={isAuthenticated}
        />
        {/* bar chart */}
        <div className="bg-primary-500 bg-opacity-70 pr-10 py-5 sm:px-6 rounded-md">
          <SimpleBarChart primaryColor={"#191919"} secondayColor={"#CAFF33"} />
        </div>
        {/* add position modal */}
        <div
          className={`${
            modalIsOpen ? "fixed" : "hidden"
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
                  <strong>{chartFilter.coinDetail.name}</strong>
                </h2>
                <p>
                  Selected Date : <strong>{selectedPos.selectedTime}</strong>
                </p>
                <p>
                  Last Price :&nbsp;
                  <strong>${changePriceFormat(selectedPos.price)}</strong>
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
                  onClick={() => setModalIsOpen(false)}
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
            onClick={() => setModalIsOpen(false)}
            className="w-full h-full bg-secondary-100 opacity-80 z-[-1]"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MainChartsSection;
