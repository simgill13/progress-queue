import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { head } from "lodash";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      bars: [],
      queue: []
    };

  }

  checkQueue = () => {
    const firstInQueue = head(this.state.queue);
    if (firstInQueue) {
      const updatedObj = firstInQueue
      updatedObj.percent = updatedObj.percent + 25;
      let sim
      let index = this.state.bars.map((element, idx) => {
        if (element.id === firstInQueue.id) {
          sim = idx
          return idx
        }
      })
      if (index) {
        if (firstInQueue.percent < 100) {
          this.setState({
            bars: [
              ...this.state.bars.slice(0, sim),
              updatedObj,
              ...this.state.bars.slice(sim + 1)
            ]
          });
        } else {
          index = []
          let updatedArray = this.state.queue;
          let deletedItem = updatedArray.splice(0, 1);
          this.setState({
            queue: updatedArray
          })
        }
      }
    }
  };

  componentDidMount() {
    this.interval = setInterval(() => this.checkQueue(), 2000);
  }

  add = () => {
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
      <div>
        <button onClick={() => this.add()}> add progress bar </button>
        {this.state.bars.map((bar, index) => {
          return (
            <LinearProgress
              key={index}
              style={{ margin: "40px" }}
              variant="determinate"
              value={bar.percent}
              color="secondary"
            />
          );
        })}
      </div>
    );
  }
}


render(<App />, document.getElementById("root"));
