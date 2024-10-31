import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Splitter,
  Typography,
} from "antd";
import React from "react";
import CompaniesList from "../App/List";
import LineChartOfPredicted from "../Graph/LineChartOfPredicted";
import SentimentsChart from "../Graph/SentimentsChart";
import { SearchOutlined } from "@ant-design/icons";
import { useStock } from "../../context/StockContext";
const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap" }}
    >
      {props.text}
    </Typography.Title>
  </Flex>
);

export enum TrainingPeriodSize {
  SHORT = "short",
  MEDIUM = "medium",
  LARGE = "large",
}

const options = [
  { label: "Short", value: TrainingPeriodSize.SHORT },
  { label: "Medium", value: TrainingPeriodSize.MEDIUM },
  { label: "Large", value: TrainingPeriodSize.LARGE },
];

const daysOptions = [
  { value: 1, label: "Next 1 day" },
  { value: 2, label: "Next 2 days" },
  { value: 5, label: "Next 5 days" },
  {
    value: 10,
    label: "Next 10 days",
    disabled: true,
  },
];

const ResizableApp = () => {
  const { filters, setFilters } = useStock();
  return (
    <Splitter style={{ height: "670px" }}>
      <Splitter.Panel defaultSize={300}>
        <div style={{ margin: "10px 10px 0px 10px" }}>
          <Input
            placeholder="Search by company name.."
            prefix={<SearchOutlined />}
            value={filters.searchText}
            onChange={(e) =>
              setFilters({ ...filters, searchText: e.target.value })
            }
          />
        </div>
        <CompaniesList />
      </Splitter.Panel>
      <Splitter.Panel>
        <Splitter layout="vertical">
          <Splitter.Panel size={500}>
            <Row>
              <Card style={{ width: "100%" }}>
                <Flex justify="space-evenly">
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    label="Select period for training data"
                    colon={false}
                  >
                    <Radio.Group
                      options={options}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          selectedPeriod: e.target.value,
                        })
                      }
                      value={filters.selectedPeriod}
                      optionType="button"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    label="Select number of days to be predicted"
                    colon={false}
                  >
                    <Select
                      value={filters.selectedNextDays}
                      style={{ width: 120 }}
                      onChange={(value) =>
                        setFilters({
                          ...filters,
                          selectedNextDays: value,
                        })
                      }
                      options={daysOptions}
                    />
                  </Form.Item>
                </Flex>
              </Card>
            </Row>
            <Row gutter={4}>
              <Col span={15}>
                <LineChartOfPredicted />
              </Col>
              <Col span={9}>
                <SentimentsChart />
              </Col>
            </Row>
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text="Bottom" />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
};

export default ResizableApp;
