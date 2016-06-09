import React from 'react';
import { bindActionCreators, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { curry, compose, reduce } from 'ramda';

import combineNamespacedProps from './combineNamespacedProps';

const _nestedBindDispatch = modules => dispatch =>
  modules.reduce((bna, module) => {
    bna[module.name] = { actions: bindActionCreators(module.actions, dispatch) };
    return bna;
  }, {});

const _collectReducers = (reducer, module) => {
  reducer[module.name] = module.reducer;
  return reducer;
};

const _registerReducers = (modules, store) => {
  const reducer = compose(
    combineReducers,
    reduce(_collectReducers, {})
  )(modules)

  store.replaceReducer(reducer);
};

function connectModules({selector, modules}, Component) {
  const nestedBoundActions = _nestedBindDispatch(modules);

  class ModuleConnector extends React.Component {
    static contextTypes = {
      store: React.PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);
      if (context.store || props.store) {
        _registerReducers(modules, context.store);
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }


  return connect(
    selector,
    nestedBoundActions,
    combineNamespacedProps
  )(ModuleConnector);
}

export default curry(connectModules);
