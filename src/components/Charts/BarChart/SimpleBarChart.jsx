import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCoinsData } from "../../Context/CoinsContext";
import { changePriceFormat } from "../../../utils";
import { useEffect, useState } from "react";
import { BarChartLoader } from "../../LoadingComponents/ChartsLoader";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function SimpleBarChart({ primaryColor, secondayColor }) {
  const [isMobile, setIsMobile] = useState(false);

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

  const {
    coinsData: { isLoading, coinPriceHitory },
  } = useCoinsData();

  if (isLoading) return <BarChartLoader />;

  if (!isLoading && coinPriceHitory)
    return (
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart width={500} height={300} data={coinPriceHitory}>
          <XAxis dataKey="time" minTickGap={10} stroke={primaryColor} />
          <YAxis
            type="number"
            tickFormatter={(value) => changePriceFormat(value)}
            stroke={primaryColor}
          />
          <Bar
            dataKey="highestPrice"
            fill={secondayColor}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default SimpleBarChart;
