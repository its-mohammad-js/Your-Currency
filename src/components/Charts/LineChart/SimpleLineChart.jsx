import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { useCoinsData } from "../../Context/CoinsContext";
import { changePriceFormat } from "../../../utils";
import { LineChartLoader } from "../../LoadingComponents/ChartsLoader";

function SimpleLineChart({ addPosition, primaryColor, secondayColor }) {
  const [isMobile, setIsMobile] = useState(false);

  const {
    coinsData: { isLoading, coinPriceHitory },
  } = useCoinsData();

  // make chart responsive on mobile device's
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isMobile]);

  function onAddPosition(e) {
    const selectedPos = e.activePayload;
    if (addPosition && e) addPosition(selectedPos);
  }

  if (isLoading) return <LineChartLoader />;

  if (!isLoading && coinPriceHitory)
    return (
      <>
        <ResponsiveContainer
          width="100%"
          height={isMobile ? 200 : 300}
          style={{ position: "relative" }}
        >
          <LineChart
            onClick={(e) => onAddPosition(e)}
            width="100%"
            height={300}
            data={coinPriceHitory}
          >
            <XAxis dataKey="time" minTickGap={10} stroke={primaryColor} />
            <YAxis
              type="number"
              tickFormatter={(value) => changePriceFormat(value)}
              stroke={primaryColor}
              padding={{ bottom: 20 }}
            />
            <Tooltip
              position={{ x: "auto", y: 180 }}
              contentStyle={{
                background: "#262626",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{
                width: `${isMobile ? "180px" : "230px"}`,
                fontSize: `${isMobile ? "0.6rem" : "0.8rem"}`,
                fontWeight: "bold",
              }}
              isAnimationActive={false}
            />
            <Legend
              wrapperStyle={{
                width: "90%",
                position: "absolute",
                right: "0px",
              }}
            />
            <Line
              type="monotone"
              dataKey="highestPrice"
              stroke={secondayColor}
              animationDuration={3000}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
}

export default SimpleLineChart;
