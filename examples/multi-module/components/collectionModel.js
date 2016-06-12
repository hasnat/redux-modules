import React from 'react';
import { bindActionCreators } from 'redux';

function collectionModel(module, Component) {
    function decoratePayload(module, action, props) {
      const decorator = props => {
        debugger;
        return { id: props.id }
      };

      return {
        action,
        ... decorator(props),
      }
    }
    return class ViewModel extends React.Component {
      static contextTypes = {
        parent: React.PropTypes.object,
      };

      static childContextTypes = {
        parent: React.PropTypes.object,
      };

      constructor(props, context) {
        super(props);
        this.bindActions = this.bindActions.bind(null, this);
      }

      getChildContext() {
        return {
          parent: this,
        };
      }

      bindActions(self, actions, props) {
        const parentDispatch =
          action => {
            const proxyAction = self.context.parent.actions[module.name];
            const decoratedAction = decoratePayload(module, action, props);
            debugger;
            return proxyAction( decoratedAction );
          }

        return bindActionCreators(
          actions,
          parentDispatch
        );
      }

      render() {
        return (
          <Component {...this.props} actions={this.bindActions(module.actions, this.props)} />
        );
      }
    }
  }

  export default collectionModel
