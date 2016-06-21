import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import combineNamespacedProps from './combineNamespacedProps';

const createMapDispatchToProps = modules => (_, ownProps) => {
  const propsDispatch = ownProps.dispatch;
  return dispatch => {
    const props = {};
    for (let i = 0; i < modules.length; ++i) {
      const { actions, name } = modules[i];
      props[name] = {
        actions: bindActionCreators(actions, propsDispatch || dispatch),
      };
    }
    return props;
  };
};

export const connectModules = (selector, modules, Component) => {
  const mapDispatchToProps = createMapDispatchToProps(modules);

  class ModuleConnector extends React.Component {
    static contextTypes = {
      registerModule: PropTypes.func,
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
    mapDispatchToProps,
    combineNamespacedProps
  )(ModuleConnector);
};

export default connectModules;
