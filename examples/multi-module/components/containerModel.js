import React from 'react';

function containerModel(module, Component) {

  return class ContainerModel extends React.Component {
    constructor(props, context) {
      super(props);
    }

    static childContextTypes = {
      parent: React.PropTypes.shape({
        actions: React.PropTypes.object,
      }),
    };

    getChildContext() {
      return {
        parent: { actions: this.props[module.name].actions },
      };
    }

    render() {
      return ( <Component {...this.props} /> );
    }
  }
};

export default containerModel
