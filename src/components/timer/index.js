import React, { Component } from "react";
import { Button } from "antd";
import Timer from "react-compound-timer";

export default class timer extends Component {
  state = {
    currDuration: null
  };

  componentDidMount() {
    const { duration } = this.props;
    this.setState({
      currDuration: parseInt(duration)
    });
  }

  handleCurrent = val => {
    const { onSubmit, submit } = this.props;
    const { currDuration } = this.state;
    submit && onSubmit(currDuration - Math.round(val) / 60000);
  };
  render() {
    const { duration, submit } = this.props;

    return (
      <div>
        {duration && (
          <Timer
            initialTime={duration === 1 ? 60000 : duration * 60000}
            direction="backward"
            lastUnit="h"
          >
            {({ getTimerState, getTime, pause }) => {
              if (submit) {
                this.handleCurrent(getTime());
                pause();
              }
              return (
                <React.Fragment>
                  <div>
                    <Timer.Hours /> hours
                    <Timer.Minutes />
                    minutes
                    <Timer.Seconds /> seconds
                  </div>
                </React.Fragment>
              );
            }}
            {}
          </Timer>
        )}
      </div>
    );
  }
}
