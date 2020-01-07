import React, { useEffect, useState } from "react";
import { withRouter, Link, Route } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import ContentComp from "../container/content";
import Question from "../container/question";
import Quiz from "../container/quiz/addQuestion";
import AllQuizzes from "../container/quiz/all";
import QuizInstruction from "../container/quizLive/instructions";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("dashboard");

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(true);
  };

  // const handleRoute = value => {
  //   // props.history.push(value.key);
  //   console.log(value);
  //   setKey(value.key);
  // };

  useEffect(() => {
    console.log(key);
  }, [key]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          // onSelect={handleRoute}
        >
          <Menu.Item key={"dashboard"}>
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"question"}>
            <Link to="/question">
              <Icon type="pie-chart" />
              <span>Create Questions</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"quiz"}>
            <Link to="/quiz">
              <Icon type="desktop" />
              <span>Create Quiz</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"all-quiz"}>
            <Link to="/all-quiz">
              <Icon type="desktop" />
              <span>All Quizzes</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px", padding: 24 }}>
          <Route path="/" exact component={() => <p>This is a dashboard</p>} />
          <Route path="/question" exact component={() => <Question />} />
          <Route path="/quiz" exact component={() => <Quiz />} />
          <Route path="/all-quiz" exact component={() => <AllQuizzes />} />
          <Route
            path="/quiz/instructions/:id"
            exact
            component={() => <QuizInstruction />}
          />
          <Route path="/quiz/:_id" exact component={() => <h1>QUIZZES!</h1>} />
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018</Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(SiderDemo);
