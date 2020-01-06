import React, { Component } from "react";
import { Card, Icon, Button, Radio, Form } from "antd";
// import capitalize from "capitalize";
import _ from "lodash";

import Draft from "./../../components/draft";
import styles from "./styles.less";
import FormItem from "../../components/FormItem";
import Request from "../../request";
import { notification } from "antd/lib";

/* eslint-disable react/no-multi-comp */
@Form.create()
class Question extends Component {
  state = {
    number: [1, 2],
    answersL: [],
    loading: false
  };

  // Check delete button state
  onDelete = key => {
    let temp = [...this.state.number];
    const index = temp.indexOf(key);
    if (index > -1) {
      temp.splice(index, 1);
    }
    this.setState({
      number: temp
    });
  };

  // add more answers
  addMore = () => {
    let temp = [...this.state.number];
    temp.push(temp[temp.length - 1] + 1);
    this.setState({
      number: temp
    });
  };

  // Select question typere
  onSelect = val => {
    this.setState({
      type: val,
      key: null,
      answersL: []
    });
  };

  // manage single type mcq answer selection
  onChange = e => {
    let obj = {
      ...this.state.answer
    };
    this.setState({
      key: e.target.value
    });
  };

  // take ques draft input
  onQuesChange = data => {
    this.setState({
      ques: data,
      reset: false
    });
  };

  //take answer options draft input
  onAnsChange = (data, key) => {
    let obj = {
      [key]: data
    };
    this.setState({
      answer: { ...this.state.answer, ...obj },
      reset: false
    });
  };

  //take solution draft input
  onSolChange = data => {
    this.setState({
      sol: data,
      reset: false
    });
  };

  handleSubmit = e => {
    const { answersL, key, answer, ques, type, sol, number } = this.state;
    e.preventDefault();
    this.setState({ loading: true });

    const { form } = this.props;

    if (!answersL.length && !key) {
      // check if at-least one option
      notification.error({
        message: "Please select an answer"
      });
      this.setState({ loading: false });
      return;
    }
    if (!ques || !sol || !answer) {
      // check if at-least one option
      notification.error({
        message: "Please enter all inputs "
      });
      this.setState({ loading: false });
      return;
    }

    form.validateFieldsAndScroll(async (err, valData) => {
      console.log(valData)
      if (!err) {
        let answers = [];
        _.forEach(number, val => {
          // add answers
          answers.push({
            answer: answer[val],
            correctAnswer: key == val || answersL.includes(val)
          });
        });
        let data = {};
        this.setState(
          {
            ques
          },
          async () => {
            const { ques: newQues } = this.state;
            data = {
              answers: answers,
              questionBody: newQues,
              solution: sol
            };
            const resp = await Request.addQuestion(data);
            console.log(resp,"RESPP")

            this.setState({ loading: false });

            if (!resp.error) {
              notification.success({
                message: resp.message
              });
              this.setState({
                key: null,
                answersL: [],
                number: [1, 2],
                reset: true
              });
              this.props.form.resetFields();
            } else {
              notification.error({
                message: "Error Saving",
                description: resp.message
              });
            }
          }
        );
      }
    });
  };

  render() {
    const { number, loading, key } = this.state;

    const answers = number.map(key => {
      const deleteEnable =
        key > 2 ? (
          <Button id={"delete"} onClick={() => this.onDelete(key)}>
            <Icon type="delete" />
          </Button>
        ) : null;
      const checkType = (
        <>
          <Radio id={"answerSelect"} key={key} value={key}>
            Select as answer
          </Radio>
        </>
      );
      return (
        <Card
          title={`Answer-${key} :`}
          className={styles.AnswersCard}
          key={key}
          id={key}
          extra={
            <>
              {checkType}
              {deleteEnable}
            </>
          }
        >
          <Draft
            // editorState={reset && reset ? `Answer-${key}` : `Answer-${key}`}
            onChange={data => {
              this.onAnsChange(data, key);
            }}
          />
        </Card>
      );
    });

    const more = (
      <Button id={"add"} className={styles.More} onClick={this.addMore}>
        More <Icon type="plus" />
      </Button>
    );
    const ansDiv = (
      <Radio.Group
        id={"answers"}
        className={styles.Answers}
        value={key}
        onChange={e => this.onChange(e, key)}
      >
        {answers}
        {more}
      </Radio.Group>
    );
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <div className={styles.type}>
              <p>{`Create Questions`} </p>
            </div>
            <Card id={"question"}>
              <Card title={"Question :"}>
                <Draft
                  // editorState={reset && reset ? "" : "<p>Question</p>"}
                  onChange={data => {
                    this.onQuesChange(data);
                  }}
                />
              </Card>
              <h2>Answers</h2>
              {ansDiv}
              <div>
                <Card title={"Solution :"} id={"solution"}>
                  <Draft
                    // editorState={reset && reset ? "" : "<p>Solution</p>"}
                    onChange={data => {
                      this.onSolChange(data);
                    }}
                  />
                </Card>
              </div>

              <FormItem
                type={"primary"}
                htmlType={"submit"}
                title={"Submit"}
                loading={loading}
                inputType={"BUTTON"}
              />
            </Card>
          </div>
        </Form>
      </>
    );
  }
}

export default Question;
