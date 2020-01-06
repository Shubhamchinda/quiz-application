import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import ContentComp from '../container/content'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(null);

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(true);
  };

  const handleRoute = value => {
    props.history.push(value.key);
    console.log(value)
    setKey(value.key);
  };

  useEffect(() => {
    console.log(key);
  }, [key]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onSelect={handleRoute}
        >
          <Menu.Item key={"/question"}>
            <Icon type="pie-chart" />
            <span>Create Questions</span>
          </Menu.Item>
          <Menu.Item key={"/quiz"}>
            <Icon type="desktop" />
            <span>Create Quiz</span>
          </Menu.Item>
          <Menu.Item key={"/all-quiz"}>
            <Icon type="desktop" />
            <span>All Quizzes</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px", padding: 24 }}>
          <ContentComp />
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018</Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(SiderDemo);
