import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import registerModule from './registerModule';

const { object, func } = PropTypes;

export default class ModuleProvider extends React.Component {
  static propTypes = {
    store: object,
    children: object,
  };

  static childContextTypes = {
    registerModule: func,
  };

  getChildContext() {
    const { store } = this.props;
    return {
      registerModule: registerModule(store),
    };
  }

  render() {
    const { store, children } = this.props;
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}
