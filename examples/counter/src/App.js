import React, { PropTypes } from 'react';
import { connectModule } from 'redux-modules';
import './App.css';
import module from './module';

const Counter = ({ count }) => (
  <div>
    The count is: {count}
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

export default connectModule(module)(Counter);
