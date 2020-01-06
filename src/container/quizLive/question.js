import React from "react";
import { Radio, Card } from "antd";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";

import styles from "./styles.less";

class Question extends React.Component {
  state = {
    loading: true,
    key: null,
    radioCheck: false
  };
  static getDerivedStateFromProps(props, state) {
    const { question, status, quesArray, value } = props;
    state.body = question && question.questionBody;
    state.type = question && question.questionType;
    state.answers = question && question.answers;
    state.status = status && status;
    state.marks = question && question.marks;
    if (question) {
      state.key = quesArray && quesArray[value] && quesArray[value].key;
    }
    console.log(state.marks);
    return {
      ...state,
      loading: false
    };
  }

  onChange = (e, value) => {
    // const { radioCheck } = this.state
    // e.target.checked = !radioCheck

    this.setState(
      {
        key: e.target.value
      },
      () => {
        const { marks } = this.state;

        const { handleQuesArray, value } = this.props;
        console.log(e.target.value);
        handleQuesArray &&
          handleQuesArray(value, e.target.checked, e.target.value, true, marks);
      }
    );
  };

  onChangeCheck = (e, key) => {
    const { handleQuesArray, value } = this.props;
    const { marks } = this.state;
    handleQuesArray &&
      handleQuesArray(value, e.target.checked, key, false, marks && marks);
  };

  handleDefaultChecked = key => {
    const { quesArray, value } = this.props;
    if (
      quesArray &&
      quesArray[value] &&
      quesArray[value] &&
      quesArray[value].key.includes(key)
    ) {
      return true;
    }
    return false;
  };

  render() {
    const { type, body, loading, answers, key, status } = this.state;
    let comp = <p>Loading</p>;
    const ans =
      answers &&
      answers.map((key, i) => {
        const checkType = (
          <>
            <Radio id={"answerSelect"} key={key} value={i}>
              Select as answer
            </Radio>
          </>
        );
        return (
          key && (
            <Card
              title={`Option-${i + 1} :`}
              key={i}
              id={i}
              extra={<>{checkType}</>}
            >
              {ReactHtmlParser(key.answer)}
            </Card>
          )
        );
      });

    const ansDiv = (
      <Radio.Group
        id={"answers"}
        value={key && key}
        className={styles.Answers}
        onChange={e => this.onChange(e, key)}
      >
        {ans}
      </Radio.Group>
    );

    if (!loading) {
      comp = (
        <>
          <h1>Question type : {type && type}</h1>
          {ReactHtmlParser(body && body)}
          <div>{ansDiv}</div>
        </>
      );
    }
    return <>{comp}</>;
  }
}

export default Question;
