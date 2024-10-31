import { Card, Typography } from "antd";
import { Fragment } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStock } from "../../context/StockContext";

const LineChartOfPredicted = () => {
  const { stock, predictionsData } = useStock();
  return (
    <Card bordered style={{ height: "100%" }}>
      <ResponsiveContainer width={700} height="80%">
        <Fragment>
          <Typography style={{ marginTop: "30px" }}>
            {`Closing / Predicted prices of ${stock?.name}`}
          </Typography>
          <LineChart
            width={730}
            height={250}
            data={predictionsData?.graph_data.map((_) => ({
              ..._,
              name: _.date,
            }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dot={false}
              type="monotone"
              dataKey="predictedPrice"
              stroke="#8884d8"
            />
            <Line
              dot={false}
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
            />
          </LineChart>
        </Fragment>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartOfPredicted;
