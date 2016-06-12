import React from 'react';
import { bindActionCreators } from 'redux';

function collectionModel(module, Component) {
    function decoratePayload(module, action, props) {
      const decorator = props => { return { id: props.id } };

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
          parent: module,
        };
      }

      bindActions(self, actions, props) {
        const parentDispatch =
          action =>
            self
            .context
            .parent
            .actions[module.name](
              decoratePayload(module, action, props)
            );

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
