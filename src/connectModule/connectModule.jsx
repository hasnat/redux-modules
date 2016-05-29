import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'ramda';

import combineNamespacedProps from './combineNamespacedProps';

function connectModule({namespace = '', actions, selector}, Component) {
  const curriedBind = curry(bindActionCreators);

  return connect(
    selector,
    curriedBind(actions),
    createNamespacedProps(namespace)
  )(Component);
}

export default curry(connectModule);
