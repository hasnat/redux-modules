import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import module from './module';
import './styles.css';

const getOrientation = orientation =>
  (orientation === 'horizontal' ? 'row' : 'column');

class Dashboard extends Component {
  render() {
    const { children, actions, orientation } = this.props;
    debugger;
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          border: '1px solid black',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 10,
            flexDirection: getOrientation(orientation),
          }}
        >
          {children.map((chatBox, id) => (
            <Dashboard
              key={id}
              {...chatBox}
              actions={{
                ...bindActionCreators(
                  module.actions,
                  a => actions.updateChild(a, { id }),
                ),
              }}
            />
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
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

export default connectModule(module)(Dashboard);
