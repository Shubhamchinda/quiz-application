import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { withRouter } from "react-router-dom";

const Result = props => {
  const [name, setName] = useState(null);
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);

  useEffect(() => {
    console.log(props);
    if (!props.history.location.student) {
      props.history.push("/");
    } else {
      const {
        name: n,
        obtainedMarks: o,
        totalMarks: t
      } = props.location.student;
      setName(n);
      setObtainedMarks(o);
      setTotalMarks(t);
    }
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "200px 500px 500px 500px",
        padding: "50px 100px"
      }}
    >
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

export default withRouter(Result);
