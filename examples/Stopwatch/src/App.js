import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import './App.css';
import module from './module';

const { start, stop } = module.actions;

class Stopwatch extends Component {
  render() {
    const { dispatch, time } = this.props;
    return (
      <div className="App">
        StopWatch
        <div> {time} </div>
        <div>
          <button onClick={dispatch(start())}>Start</button>
          <button onClick={dispatch(stop())}>Stop</button>
        </div>
      </div>
    );
  }
}

export default connectModule(module)(Stopwatch);
