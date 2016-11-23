import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import './App.css';
import module from './module';

const { start, stop } = module.actions;

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.props.running && this.props.actions.tick(this.props.time + 1);
  }

  render() {
    const { time, actions } = this.props;
    return (
      <div className="App">
        <div> {time} </div>
        <div>
          <button onClick={actions.start}>Start</button>
          <button onClick={actions.stop}>Stop</button>
          <button onClick={actions.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default connectModule(module)(Stopwatch);
