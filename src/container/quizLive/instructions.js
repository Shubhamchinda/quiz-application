import React from "react";
import { Button, Card, Row, Col, Form } from "antd";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import Request from "../../request";
import capitalize from "capitalize";

import HtmlParser from "react-html-parser";
import FormItem from "../../components/FormItem";

@Form.create()
class Instructions extends React.Component {
  tempData = [];
  state = {
    loading: false,
    tableLoading: false,
    data2: [],
    pagination: {},
    searchText: "",
    loading: false,
    id: "",
    Details: [],
    finalData: [],
    flag: false,
    key: true
  };
  componentDidMount() {
    this.apiRequest();
  }
  handleSubmit = () => {
    
    this.props.history.push(`/quiz/${this.state.id}`);
    // Request.submitTest({ id: this.state.id })
  };

  apiRequest = async (params = {}) => {
    this.setState({ loading: true });
    console.log(this.props);
    let url = window.location.pathname.split("/").pop();
    // let url = this.props.history.location.url;

    let data2 = await Request.getQuizById("5e142e26f750d43044014fca");
    console.log(data2);

    this.setState({
      id: url,
      tableLoading: false,
      loading: false,
      data2: data2.data,
      duration: parseInt(data2.data && data2.data.duration)
    });
  };
  gridStyle = {
    width: "25%",
    textAlign: "center"
  };
  renderButton = () => {
    this.setState({
      key: false
    });
  };

  handleStudName = e => {
    if (e) {
      this.setState({
        key: false,
        studName : e
      });
    } else {
      this.setState({
        key: true
      });
    }
  };
  render() {
    const validateRule = {
      rules: [{ required: true, message: "Required field" }]
    };
    const {
      form: { getFieldDecorator }
    } = this.props;

    const fIAll = {
      getFieldDecorator,
      validateRule
    };

    const { duration, data2 , studName} = this.state;
    const { loading, key } = this.state;
    return (
      <>
        <Card loading={loading}>
          {data2.testName ? (
            <h1 style={{ textAlign: "center", fontSize: "25px" }}>
              {capitalize(data2.testName)}
            </h1>
          ) : null}
          <br />
          <p>
            <div>
              <Row gutter={16}>
                <Col span={8} size="small">
                  <Card
                    bordered={false}
                    size="small"
                    style={{ fontWeight: "bold" }}
                  >
                    <h3>Total Marks</h3>
                    <hr />
                    {data2.totalMarks}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    bordered={false}
                    size="small"
                    style={{ fontWeight: "bold" }}
                  >
                    <h3>Passing Marks</h3>
                    <hr />
                    {data2.passingMarks}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    bordered={false}
                    size="small"
                    style={{ fontWeight: "bold" }}
                  >
                    <h3>Duration</h3>
                    <hr />
                    {data2.duration}
                  </Card>
                </Col>
              </Row>
            </div>
          </p>
        </Card>
        <Card loading={loading}>
          <h1 style={{ textAlign: "center", fontSize: "20px" }}>
            Instructions
          </h1>
          <p>{data2.description ? HtmlParser(data2.description) : null}</p>
          <br />
          <Card
            style={{ width: "50%", margin: "0 auto", padding: "0px" }}
            bordered={false}
          >
            <FormItem
              {...fIAll}
              label={"Student Name"}
              name={"studentName"}
              onChange={e => this.handleStudName(e)}
            />
            <br />
            <Button
              type="primary"
              block
              style={{}}
              onClick={this.handleSubmit}
              disabled={key}
            >
              Start Test
            </Button>
          </Card>
        </Card>
      </>
    );
  }
}

export default withRouter(Instructions);
