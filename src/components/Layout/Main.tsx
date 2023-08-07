import { Button } from "antd";
import {
  LineChartOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
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
        theme="light"
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: "Past IPC scores",
              icon: React.createElement(BarChartOutlined),
              onClick: () => nav("past_ipc"),
            },
            {
              key: "2",
              label: "Events",
              icon: React.createElement(EnvironmentOutlined),
              onClick: () => nav("features"),
            },
            {
              key: "3",
              label: "Predictions",
              icon: React.createElement(LineChartOutlined),
              onClick: () => nav("predictions"),
            },
          ]}
        />
      </Sider>
      <Layout style={{ height: "100vh" }}>{props.children}</Layout>
    </Layout>
  );
};

export default Main;
