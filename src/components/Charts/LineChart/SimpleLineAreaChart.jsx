import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

function SimpleLineAreaChart({ lineData, lineKey, lineColor, areaColor }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={200} height={60} data={lineData}>
        <Area
          type="monotone"
          dataKey={lineKey}
          stroke={lineColor}
          strokeWidth={2}
          fill={areaColor}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineAreaChart;
