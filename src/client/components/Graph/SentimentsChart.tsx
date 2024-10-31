import { Card } from "antd";
import { Fragment } from "react";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SentimentCard from "./components/SentimentCard";
import { useStock } from "../../context/StockContext";
const data = [
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "unknow",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658",
  },
];
function SentimentsChart() {
  const { stock, predictionsData } = useStock();
  const currentPrice = stock?.currentPrice ?? 0;
  const [nextDayValue] = predictionsData?.predictions ?? [0];
  const difference = parseFloat(
    (((nextDayValue - currentPrice) / currentPrice) * 100).toFixed(2)
  );
  return (
    <Card bordered style={{ height: "100%" }}>
      <ResponsiveContainer height="80%">
        <Fragment>
          <RadialBarChart
            width={400}
            height={250}
            innerRadius="10%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              label={{ fill: "#666", position: "insideStart" }}
              background
              dataKey="uv"
            />
            <Tooltip />
          </RadialBarChart>
          <SentimentCard
            title={`Sentimental analysis of ${stock?.name}`}
            price={currentPrice}
            difference={difference}
            nextDayValue={nextDayValue}
          />
        </Fragment>
      </ResponsiveContainer>
    </Card>
  );
}

export default SentimentsChart;
