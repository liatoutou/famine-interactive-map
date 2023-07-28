import { Button } from "antd";
import {
  QuestionCircleOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "./Layout.css";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type Props = {
  children?: React.ReactNode;
};

const Main = (props: Props) => {
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Button 
        className="collapse-button"
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginBottom: 16,
          zIndex: 1,
        }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Sider
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: "Dashboard",
              icon: React.createElement(BarChartOutlined),
              onClick: () => nav("dashboard"),
            },
            {
              key: "2",
              label: "Anomalies",
              icon: React.createElement(ExclamationCircleOutlined),
              onClick: () => nav("anomalies"),
            },
            {
              key: "3",
              label: "About",
              icon: React.createElement(QuestionCircleOutlined),
              onClick: () => nav("about"),
            },
          ]}
        />
      </Sider>
      <Layout style={{ height: "100vh" }}>{props.children}</Layout>
    </Layout>
  );
};

export default Main;
