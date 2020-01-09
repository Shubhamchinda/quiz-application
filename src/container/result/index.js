import React from "react";
import { Card } from "antd";
import { withRouter } from "react-router-dom";

const result = props => {
  const { name, obtainedMarks, totalMarks } =  props.location && props.location.student;
// const name = true
  return (
    <div style={{ textAlign: "center" , margin: "200px 500px 500px 500px", padding: "50px 100px"}}>
      {name ? (
        <Card
          title={`Result of ${name}`}
          bordered={false}
          style={{ width: 300 }}
        >
          <p>Total Marks : {totalMarks}</p>
          <p>Obtained Marks : {obtainedMarks}</p>
        </Card>
      ) : (
        <h2>No Result</h2>
      )}
    </div>
  );
};

export default withRouter(result);
