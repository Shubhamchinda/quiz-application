import React from "react";
import { Route } from "react-router-dom";

import Question from "../question";
import Quiz from "../quiz/addQuestion";
import AllQuizzes from "../../components/QuestionList";

const index = props => {
  const selectContent = () => {
    const { content } = props;

    if (content === "dashboard") {
      return <p>This is a dashboard</p>;
    }
    if (content === "question") {
      return <Route path="/question" component={() => <Question />} />;
    }
    if (content === "quiz") {
      return <Quiz />;
    }
    if (content === "all-quiz") {
      return <AllQuizzes />;
    }
  };

  return <div>{selectContent()}</div>;
};

export default index;
