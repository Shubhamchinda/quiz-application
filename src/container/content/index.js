import React from "react";
import { Route } from "react-router-dom";

import Question from "../question";
import Quiz from "../quiz/addQuestion";
import AllQuizzes from "../quiz/all";

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
      return <Route path="/quiz" component={() => <Quiz />} />;
    }
    if (content === "all-quiz") {
      return <Route path="/all-quiz" component={() => <AllQuizzes />} />;
    }
    if (content === "quiz:id") {
      return <h1>QUIZZZZ!</h1>;
    } 
  };

  return <div>{selectContent()}</div>;
};

export default index;
