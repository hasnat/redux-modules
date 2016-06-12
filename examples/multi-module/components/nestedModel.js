import React from 'react';
import { bindActionCreators } from 'redux';

const defaultDecorate = (action, props) => ({id: props.id, action});

function nestedModel(module, Component) {

  function getProxyAction(parent) {
    return parent.actions[module.name];
  }

  function bindActions(actions, context, props) {
    const proxyAction = getProxyAction(context.parent);
    const parentDispatch = action => {
      const decoratedAction = decorateAction(action, props);
      return proxyAction(decoratedAction);
    }

    return bindActionCreators(
      actions,
      parentDispatch
    );
  }

  function decorateAction(action, props) {
    const decorator = defaultDecorate;
    return {
      ... decorator(action, props),
    }
  }

  return class NestedModel extends React.Component {
    constructor(props, context) {
      super(props);
    }

    static contextTypes = {
      parent: React.PropTypes.shape({
        actions: React.PropTypes.object,
      }),
    };

    static childContextTypes = {
      parent: React.PropTypes.shape({
        actions: React.PropTypes.object,
      }),
    };

    getChildContext() {
      return {
        parent: { actions: this.getBoundActions() },
      };
    }

    getBoundActions() {
      return bindActions(module.actions, this.context, this.props);
    }

    render() {
      return (
        <Component
          {...this.props}
          actions={this.getBoundActions()} />
      );
    }
  }
};

export default nestedModel
