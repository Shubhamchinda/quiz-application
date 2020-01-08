import React from "react";
import { Button, Card } from "antd";
import _ from "lodash";
import Request from "../../request";
import Question from "./question";
import { withRouter } from "react-router-dom";

import QuestionStatus from "./questionStatus";
import styles from "./styles.less";

class onlineTest extends React.Component {
  state = {
    data: null,
    value: 0,
    quesArray: [],
    count: []
  };
  async componentDidMount() {
    console.log(this.props);
    let url = window.location.pathname.split("/").pop();
    if (this.props.location.name === undefined) {
      this.props.history.push(`/`);
    }
    this.setState({
      url: url
    });
    const data = await Request.getQuizById(url);
    console.log(data);
    const questions = data && data.data && data.data.questions;
    this.setState(
      {
        data: data.data,
        questions: questions
      },
      async () => {
        console.log(this.state, "STATREE", data);
        let tempData = {
          testId: url
        };
        // const x = await Request.submitTest(tempData);
        console.log(tempData, "SUMIT");
      }
    );
  }

  handlePrevButton = () => {
    const temp = this.state.value;
    this.setState({
      value: temp - 1
    });
  };

  handleNextButton = () => {
    const temp = this.state.value;
    this.setState(
      {
        value: temp + 1,
        skip: false
      },
      async () => {
        const { value } = this.state;
        let newArr = this.state.quesArray.map(data => {
          return {
            qid: data.qid,
            markedOption: data.markedOption,
            isCorrect: false,
            marks: data.marks
          };
        });
        let tempData = {
          testId: this.state.url,
          result: {
            answers: newArr
          }
        };
        // const res = await Request.submitTest(tempData);
      }
    );
  };
  handleSkipButton = () => {
    const temp = this.state.value;
    this.setState({
      value: temp + 1,
      skip: true
    });
  };

  handleSubmit = async () => {
    const { data, quesArray, questions } = this.state;
    let newArr = quesArray.map((data, index) => {
      // console.log(data, questions[index], "INDEX");
      let t = data.markedOption[0].charCodeAt(0) - 97;
      let flag = false;
      if (questions[index].answers[t].correctAnswer) {
        flag = true;
      }
      return {
        markedOption: data.markedOption,
        isCorrect: flag,
        marks: flag ? data.marks : 0
      };
    });
    let tempData = {
      testId: this.state.url,
      result: {
        answers: newArr
      }
    };

    let result = 0;
    _.each(newArr, val => {
      result += val.marks;
    });
    // console.log(tempData, quesArray, result,  "ASDSADAasdsadas");
    let subData = {
      qid: this.state.url,
      result: {
        name: this.props.location.name,
        obtainedMarks: result,
        answers: newArr
      },
      totalMarks: data.totalMarks
    };
    // let resp = Request.addResult(subData);
    // console.log(resp, "NEXTTTt");
    alert(`
      Obtained Marks : ${result}
      Total Marks : ${data.totalMarks}
    `)
  };

  handleQuesChange = key => {
    this.setState({
      value: key
    });
  };

  handleQuesArray = (value, marked, key, singleMcq, marks) => {
    const { quesArray, count, skip, data } = this.state;

    let tempArr = [...quesArray];
    let tempKey = [];
    const eTempKey =
      quesArray &&
      quesArray.length > 0 &&
      quesArray[value] &&
      quesArray[value].key;
    if (!singleMcq) {
      tempKey = eTempKey ? eTempKey : [];
      if (!tempKey.includes(key)) {
        tempKey.push(key);
      } else {
        let index = tempKey.indexOf(key);
        tempKey.splice(index, 1);
      }
    }
    console.log(value, key, "KKKK");

    let temp = {};
    if (singleMcq) {
      temp = {
        marked: marked,
        key: key,
        markedOption: [(10 + key).toString(36)],
        seen: true,
        skip: skip && skip,
        qid: this.getCurrentQuestion()._id,
        marks: marks
      };
    } else {
      temp = {
        marked: marked,
        key: tempKey,
        markedOption: [(10 + key).toString(36)],
        seen: true,
        skip: skip && skip,
        qid: this.getCurrentQuestion()._id,
        marks: marks
      };
    }
    let tempCount = [...count];
    if (!tempCount.includes(value) && !marked) {
      tempCount.push(value);
    }
    if (quesArray && quesArray.length && quesArray[value]) {
      tempArr[value] = { ...temp };
      this.setState({
        quesArray: tempArr,
        count: tempCount
      });
    } else {
      tempArr[value] = { ...temp };
      this.setState({
        quesArray: tempArr,
        count: tempCount
      });
    }
  };

  getCurrentQuestion = () => {
    const { data, value } = this.state;
    const q = data && data.questions;
    return data && data.questions && data.questions[value];
  };

  render() {
    const { data, value, quesArray, count } = this.state;
    const q = data && data.questions;
    const ques = this.getCurrentQuestion();
    const status =
      data &&
      data.questions.length > 0 &&
      data.questions.map((val, index) => index);
    let comp = <p>Loading...</p>;
    if (ques && ques) {
      comp = (
        <Card>
          <p>Section</p>
          {ques && (
            <Question
              question={ques && ques}
              value={value && value}
              status={status && status}
              handleQuesArray={this.handleQuesArray}
              quesArray={quesArray && quesArray}
            />
          )}
        </Card>
      );
    }
    let buttons = (
      <>
        <Button disabled={value == 0} onClick={this.handlePrevButton}>
          Previous
        </Button>
        <Button
          disabled={q && q.length && value > q.length - 2}
          onClick={this.handleSkipButton}
        >
          Skip
        </Button>
        <Button
          disabled={q && q.length && value > q.length - 2}
          onClick={this.handleNextButton}
        >
          Next
        </Button>
        {q && q.length && value > q.length - 2 && (
          <Button onClick={this.handleSubmit}>Submit</Button>
        )}
      </>
    );
    return (
      <>
        <div className={styles.QuesAndStatus}>
          <div className={styles.AnswersCard}>
            {comp}
            {buttons}
          </div>
          {ques && (
            <QuestionStatus
              status={status && status}
              currentQues={value}
              quesStatus={this.handleQuesArray}
              switchHandle={key => this.handleQuesChange(key)}
              quesArray={quesArray && quesArray}
              count={count && count}
            />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(onlineTest);
