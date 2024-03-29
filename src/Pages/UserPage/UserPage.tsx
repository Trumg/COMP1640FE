import React from "react";
import { Layout, Card, Row, Col } from "antd";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <UserNavbar />
      </div>
      <Content
        style={{
          padding: "24px 48px 0",
          flexGrow: 1,
          marginTop: "69px", // Adjusted for the height of the navbar
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 69px - 48px - 48px)", // Adjusted for padding and navbar height
            position: "relative", // Needed for z-index to work
            zIndex: 0, // Ensure content is below the navbar
          }}
        >
          <Row gutter={16}>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: "16px" }}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
