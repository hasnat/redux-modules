import React from 'react';
import { bindActionCreators } from 'redux';

function collectionModel(module, Component) {
    function decoratePayload(module, action, props) {
      const decorator = props => { return { id: props.id } },

      return {
        action,
        ... decorator(props),
      }
    }
    return class ViewModel extends React.Component {
      static childContextTypes = {
        parent: string,
      },

      constructor(props, context) {
        super(props);
        this.bindActions = this.bindActions.bind(this);
      }

      getChildContextTypes() {
        return {
          parent: module,
        };
      }

      bindActions(actions, props) {
        const parentDispatch =
          action =>
            this
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
