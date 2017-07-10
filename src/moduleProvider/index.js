import { Children, Component } from 'react';
import PropTypes from 'prop-types';

import createRegisterModule from './createRegisterModule';

import storeShape from '../utils/storeShape';

export default class ModuleProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    combineReducers: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    staticReducers: PropTypes.object,
    store: storeShape.isRequired,
  };

  static childContextTypes = {
    registerModule: PropTypes.func.isRequired,
    store: storeShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
    this.registerModule = createRegisterModule(props.store, props.combineReducers);
    if (typeof props.staticReducers !== 'undefined') {
      this.registerModule(props.staticReducers);
    }
  }

  getChildContext() {
    return {
      registerModule: this.registerModule,
      store: this.store,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
