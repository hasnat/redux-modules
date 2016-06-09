import React from 'react';
import { bindActionCreators, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { curry, compose, reduce } from 'ramda';

import combineNamespacedProps from './combineNamespacedProps';
import recalculateReducers from './recalculateReducers';

const _nestedBindDispatch = modules => dispatch =>
  modules.reduce((bna, module) => {
    bna[module.name] = { actions: bindActionCreators(module.actions, dispatch) };
    return bna;
  }, {});

function connectModules({selector, modules}, Component) {
  const nestedBoundActions = _nestedBindDispatch(modules);

  class ModuleConnector extends React.Component {
    static contextTypes = {
      store: React.PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);
      recalculateReducers(modules, context.store);
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
