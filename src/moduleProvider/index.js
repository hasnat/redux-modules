import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import registerModule from './registerModule';

export default class ModuleProvider extends React.Component {
  static propTypes = {
    // Alternatively, you could pull "storeShape" from "react-redux"
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }),
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    registerModule: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    // <Provider> does not support changing "store", so "store" should always be the same instance
    this.registerModule = registerModule(props.store);
  }

  getChildContext() {
    return {
      registerModule: this.registerModule,
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
