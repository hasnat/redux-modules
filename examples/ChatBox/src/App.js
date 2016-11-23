import React, { Component } from 'react';
import { connectModule } from 'redux-modules';
import module from './module';
import logo from './logo.svg';
import './styles.css';

class ChatBox extends Component {
  render() {
    return (
      <div style={{ flex: 1, margin: '20px' }}>
        >
      </div>
    );
  }
}

export default connectModule(module)(ChatBox);
