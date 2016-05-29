import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'ramda';

import combineNamespacedProps from './combineNamespacedProps';

const nestedBindDispatch = modules => dispatch =>
  modules.reduce((bna, module) => {
    bna[module.name] = { actions: bindActionCreators(module.actions, dispatch) };
  }, {});


function connectModules({selector, modules}, Component) {
  const nestedBoundActions = nestedBindDispatch(modules);

  return connect(
    selector,
    nestedBoundActions,
    combineNamespacedProps
  )(Component);
}

export default curry(connectModules);
