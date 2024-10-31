import React from "react";
import { Typography, Button, Row, Col, Card, Layout } from "antd";
import {
  LineChartOutlined,
  FundOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { SignInButton, useSignIn } from "@clerk/clerk-react";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomePage: React.FC = () => {
  return (
    <Layout style={{ background: "#ffffff" }}>
      <Content
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1rem" }}
      >
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <Title level={2} style={{ color: "#444444" }}>
            Welcome to NeuroStock
          </Title>
          <Text style={{ color: "#444444", fontSize: "16px" }}>
            Your AI-powered platform for stock price prediction, sentiment
            analysis, and trend monitoring.
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          style={{
            marginTop: "2rem",
            backgroundColor: "#444444",
            borderColor: "#444444",
          }}
        >
          Get Started
        </Button>
        <Row gutter={[24, 24]} justify="center" style={{ padding: "4rem 0" }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                backgroundColor: "#f7f7f7",
              }}
            >
              <LineChartOutlined
                style={{
                  fontSize: "60px",
                  color: "#444444",
                  marginBottom: "1rem",
                }}
              />
              <Title level={4} style={{ color: "#444444" }}>
                Predict Tomorrow’s Price
              </Title>
              <Text style={{ color: "#666666" }}>
                Get AI-driven predictions for the next day’s stock prices.
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                backgroundColor: "#f7f7f7",
              }}
            >
              <FundOutlined
                style={{
                  fontSize: "60px",
                  color: "#444444",
                  marginBottom: "1rem",
                }}
              />
              <Title level={4} style={{ color: "#444444" }}>
                Analyze Sentiments
              </Title>
              <Text style={{ color: "#666666" }}>
                Discover real-time sentiment analysis on your favorite stocks.
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                backgroundColor: "#f7f7f7",
              }}
            >
              <BarChartOutlined
                style={{
                  fontSize: "60px",
                  color: "#444444",
                  marginBottom: "1rem",
                }}
              />
              <Title level={4} style={{ color: "#444444" }}>
                Check Market Trends
              </Title>
              <Text style={{ color: "#666666" }}>
                Stay ahead with AI insights into current market trends.
              </Text>
            </Card>
          </Col>
        </Row>

        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <Title level={3} style={{ color: "#444444" }}>
            Ready to make informed investment decisions?
          </Title>
          <SignInButton
            children={
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#444444",
                  borderColor: "#444444",
                }}
              >
                Sign up on NeuroStock Today
              </Button>
            }
          />
        </div>
      </Content>
    </Layout>
  );
};

export default WelcomePage;
