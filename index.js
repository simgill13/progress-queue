import React, { Component,Fragment } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { head } from "lodash";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bars: [],
      queue: []
    };
  }

  

  componentDidMount() {this.interval = setInterval(() => this.checkQueue(), 300)}

  componentWillUnmount (){clearInterval(this.interval)};
  

  checkQueue = () => {
    const nextInQueue = head(this.state.queue);
    if (nextInQueue) {
      let barIndexValue;
      const updatedObj = nextInQueue;
      updatedObj.percent = updatedObj.percent + 5;
      let index = this.state.bars.map((element, idx) => {
        if (element.id === nextInQueue.id) {
          barIndexValue = idx;
          return idx;
        }
      });
      if (index) {
        if (nextInQueue.percent < 100) {
          this.setState({
            bars: [
              ...this.state.bars.slice(0, barIndexValue),
              updatedObj,
              ...this.state.bars.slice(barIndexValue + 1)
            ]
          });
        } else {
          const updatedArray = this.state.queue;
          const deletedItem = updatedArray.splice(0, 1);
          this.setState({ queue: updatedArray });
        }
      }
    }
  };

  addBar = () => {
    const bar = {
      id: Math.random()
        .toString(36)
        .substring(7),
      percent: 0
    };
    this.setState({
      queue: [...this.state.queue, bar],
      bars: [...this.state.bars, bar]
    });
  };

  render() {
    return (
      <Fragment>
        <p> By: Sim Gill </p>
        <button onClick={() => this.addBar()}> Add a Progress Bar </button>
        {this.state.bars.map((bar, index) => {
          return (
            <LinearProgress
              key={index}
              style={{ margin: "40px", height: "10px", color: "#0F7E20" }}
              variant="determinate"
              value={bar.percent}
            />
          );
        })}
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
