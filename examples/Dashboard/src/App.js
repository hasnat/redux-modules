import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from '../../../src';
import module from './module';
import './styles.css';

import Stopwatch from '../../Stopwatch/src/App';
import PokemonMe from '../../PokemonMe/src/App';
import stopwatchModule from '../../Stopwatch/src/module';

const getOrientation = orientation =>
  (orientation === 'horizontal' ? 'row' : 'column');

const components = {
  stopwatch: Stopwatch,
  pokemonMe: PokemonMe,
};
const getComponent = (contentType) => {
  return components[contentType] || (() => <div>None</div>);
}

class Dashboard extends Component {

  render() {
    const { children, content, actions, orientation, contentType } = this.props;
    const ContentComponent = getComponent(contentType);
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
        {!children.length &&
          <ContentComponent
            {...content}
            dispatch={this.props.actions.updateContent}
          />
        }
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
        <div style={{ position: 'absolute', left: 0, top: '40px' }}>
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
