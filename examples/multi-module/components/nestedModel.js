import React from 'react';
import { bindActionCreators } from 'redux';

const defaultDecorate = (action, props) => ({id: props.is, action});

function nestedModel(module, Component) {

  function getProxyAction(parent) {
    const cProps = parent.container.props;
    const cModName = parent.module.name;
    return cProps[cModName].actions[module.name];
  }

  function bindActions(actions, context, props) {
    const proxyAction = getProxyAction(contex.parent);
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
    static contextTypes = {
      parent: React.PropTypes.shape({
        module: React.PropTypes.object,
        container: React.PropTypes.object,
      }),
    };

    static childContextTypes = {
      parent: React.PropTypes.shape({
        module: React.PropTypes.object,
        container: React.PropTypes.object,
      }),
    };

    getChildContext() {
      return {
        parent: { module, container },
      };
    }

    constructor(props, context) {
      super(props);
    }

    render() {
      return (
        <Component
          {...this.props}
          actions={this.bindActions(module.actions, this.context, this.props)} />
      );
    }
  }
};

export default nestedModel
