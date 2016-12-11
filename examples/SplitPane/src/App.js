import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import module from './module';
import logo from './logo.svg';
import './styles.css';

const getDirection = direction =>
  (direction === 'horizontal') ? 'row' : 'column';

class ChatBox extends Component {
  render() {
    const { children, lines, actions, currentSplitDirection } = this.props;
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        border: '1px solid black',
        height: '100%',
        position: 'relative',
      }}>
        {!children.length && lines.map(line => (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {line}
          </div>
        ))}

        <div style={{
          display: 'flex',
          flex: 10,
          flexDirection: getDirection(currentSplitDirection),
        }}>
          {children.map((chatBox, id) => (
            <ChatBox
              key={id}
              {...chatBox}
              actions={{
                ...bindActionCreators(
                  module.actions,
                  a => actions.updateChild(a, { id })
                )
              }}
            />
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, top: 0}}>
          <button onClick={() => actions.addLine('Hello')}>
            New Line
          </button>
          <button onClick={() => actions.splitRequest('horizontal')}>
            Split Horizontal
          </button>
          <button onClick={() => actions.splitRequest('vertical')}>
            Split Vertical
          </button>
        </div>
      </div>
    );
  }
}

export default connectModule(module)(ChatBox);
