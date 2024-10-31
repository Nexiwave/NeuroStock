import React from "react";
import { Card, List, Skeleton, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useStock } from "../../context/StockContext";

const CompaniesList: React.FC = () => {
  const {
    stock,
    updateStock,
    companiesListDataLoading,
    companiesListData,
    fetchPredictionsData,
  } = useStock();

  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      loadMore={false}
      dataSource={companiesListData ?? []}
      renderItem={(item) => (
        <List.Item>
          <Skeleton
            avatar
            title={false}
            loading={companiesListDataLoading}
            active
          >
            <Card
              style={{
                width: 280,
                margin: "0px auto",
                cursor: "pointer",
                ...(stock?.name == item.name && { backgroundColor: "#f0f0f0" }),
              }}
              onClick={() => {
                updateStock(item);
                fetchPredictionsData(item.ticker);
              }}
            >
              <Statistic
                title={item.name}
                value={item.currentPrice}
                precision={2}
                prefix="₹"
                valueStyle={{ textAlign: "start" }}
              />
              <Statistic
                value={item.differencePercentage}
                precision={2}
                valueStyle={{
                  color: item.differencePercentage > 0 ? "#3f8600" : "red",
                  fontSize: "12px",
                  textAlign: "start",
                }}
                prefix={
                  item.differencePercentage > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                suffix="%"
              />
            </Card>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default CompaniesList;
