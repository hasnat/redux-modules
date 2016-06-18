import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import combineNamespacedProps from './combineNamespacedProps';

const { func } = PropTypes;

const nestedBindDispatch = modules => dispatch =>
  modules.reduce((bna, { name, actions }) => {
    // eslint-disable-next-line no-param-reassign
    bna[name] = { actions: bindActionCreators(actions, dispatch) };
    return bna;
  }, {});

export const connectModules = (selector, modules, Component) => {
  const nestedBoundActions = nestedBindDispatch(modules);

  class ModuleConnector extends React.Component {
    static contextTypes = {
      registerModule: func,
    };

    constructor(props, context) {
      super(props, context);

      if (context.registerModule) {
        context.registerModule(modules);
      }
    }

    render() {
      return (<Component {...this.props} />);
    }
  }

  return connect(
    selector,
    nestedBoundActions,
    combineNamespacedProps
  )(ModuleConnector);
};

export default connectModules;
