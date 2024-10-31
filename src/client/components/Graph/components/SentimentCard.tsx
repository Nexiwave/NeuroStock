import React from "react";
import { Card, Flex, Statistic } from "antd";
import Typography from "antd/es/typography/Typography";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface SentimentCardProps {
  title: string;
  price: number;
  difference: number;
  nextDayValue: number;
}

const SentimentCard: React.FC<SentimentCardProps> = ({
  title,
  price,
  difference,
  nextDayValue,
}) => {
  return (
    <Card style={{ width: 400 }} bordered={false}>
      <Typography>{title}</Typography>
      <Flex justify="space-around">
        <Statistic title="Price" value={price} prefix="₹" />
        <Statistic
          title="Difference"
          value={difference}
          suffix="%"
          valueStyle={{ color: difference > 0 ? "green" : "red" }}
          prefix={
            difference > 0 ? (
              <ArrowUpOutlined />
            ) : (
              <ArrowDownOutlined />
            )
          }
        />
        <Statistic
          title="Next Day Value"
          value={nextDayValue.toFixed(2)}
          prefix="₹"
        />
      </Flex>
    </Card>
  );
};

export default SentimentCard;
