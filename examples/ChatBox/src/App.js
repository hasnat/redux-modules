import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import module from './module';
import logo from './logo.svg';
import './styles.css';

class ChatBox extends Component {
  render() {
    return (
      <div style={{ flex: 1, margin: '20px' }}>
        {this.props.lines.map(line => (
          <div>{line}</div>
        ))}
        >

        {this.props.children.map((chatBox, id) => (
          <ChatBox
            key={id}
            {...chatBox}
            actions={{
              ...bindActionCreators(
                module.actions,
                a => this.props.actions.updateChild(a, { id })
              )
            }}
          />
        ))}
        <div>
          <button onClick={() => this.props.actions.addLine('Hello')}>
            New Line
          </button>
          <button onClick={() => this.props.actions.splitRequest('horizontal')}>
            Split Horizontal
          </button>
          <button onClick={() => this.props.actions.splitRequest('vertical')}>
            Split Vertical
          </button>
        </div>
      </div>
    );
  }
}

export default connectModule(module)(ChatBox);
