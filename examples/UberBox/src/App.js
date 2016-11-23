import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import module from './module';
import logo from './logo.svg';
import './styles.css';

const getDirection = direction =>
  (direction === 'horizontal') ? 'row' : 'column';

const DefaultView = () => (
  <div style={{ height: '100%', width: '100%', backgroundColor: 'blue' }}>
    Welcome to UberBox
  </div>
);

class UberBox extends Component {
  render() {
    const { childBoxes, lines, actions, currentSplitDirection, children } = this.props;
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
        {!childBoxes.length && children}

        <div
          style={{
            display: 'flex',
            flex: 10,
            flexDirection: getDirection(currentSplitDirection),
          }}
        >
          {childBoxes.map(({ widget, ...box }, id) => {
            const View = DefaultView;
            return (
              <UberBox
                key={id}
                {...box}
                actions={{
                  ...bindActionCreators(
                    module.actions,
                    a => actions.updateChild(a, { id }),
                  ),
                }}
              >
                <View />
              </UberBox>
            )
          })}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
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

export default connectModule(module)(UberBox);
