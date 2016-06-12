import React from 'react';
import { bindActionCreators } from 'redux';

const defaultDecorate = action => { return { action } };

function viewModel(module, Component) {
    function decoratePayload(module, action, props) {
      const decorator = defaultDecorate;

      return {
        action,
        ... decorator(props),
      }
    }
    return class ViewModel extends React.Component {
      static childContextTypes = {
        parent: React.PropTypes.string,
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

  export default viewModel
