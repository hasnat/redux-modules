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
      static contextTypes = {
        parent: React.PropTypes.object,
      };

      static childContextTypes = {
        parent: React.PropTypes.string,
      };

      constructor(props, context) {
        super(props);
        this.bindActions = this.bindActions.bind(null, this);
      }

      getChildContext() {
        console.log('MODULE', module);
        return {
          parent: module,
        };
      }

      bindActions(self, actions, props) {
        console.log('BINDING', module.name);
        console.log('CONTEXT', self.context);
        let parentDispatch;
        if (!self.context.parent) {
          return self.props[module.name].actions;
        } else {
          parentDispatch =
            action =>
              self
              .context
              .parent
              .actions[module.name](
                decoratePayload(module, action, props)
              );
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

  export default viewModel
