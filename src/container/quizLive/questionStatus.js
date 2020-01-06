import React, { Component } from "react";
import { Button } from "antd";

import styles from "./styles.less";

class QuestionStatus extends Component {
  state = {
    status: []
  };

  static getDerivedStateFromProps(props, state) {
    const { status } = props;
    return {
      status: status && status
    };
  }

  handleQues = key => {
    const { switchHandle } = this.props;
    switchHandle && switchHandle(key);
  };

  typeHandler = key => {
    const { currentQues, quesArray } = this.props;
    if (currentQues && currentQues == key) {
      return styles.CurrentQuestion;
    }
    if (quesArray && quesArray) {
      console.log(quesArray, "SKIP");
      const condition =
        quesArray[key] && quesArray[key].key && quesArray[key].key.length > 0;

      if (condition || (quesArray[key] && quesArray[key].marked)) {
        return styles.MarkedQuestion;
      } else if (quesArray[key] && quesArray[key].skip) {
        return styles.UnMarkedQuestion;
      }
    }
  };

  render() {
    const { status } = this.state;
    const quesStatus =
      status &&
      status.length > 0 &&
      status.map(key => (
        <Button
          className={`${styles.StatusButton} ${this.typeHandler(key)}`}
          shape="circle"
          key={key}
          onClick={() => this.handleQues(key)}
          value={key}
        >
          {key + 1}
        </Button>
      ));
    return <div className={styles.StatusButtonDiv}>{quesStatus}</div>;
  }
}

export default QuestionStatus;
