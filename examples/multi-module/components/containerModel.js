import React from 'react';

function containerModel(module, Component) {

  return class ContainerModel extends React.Component {
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
        parent: { module, container: this },
      };
    }

    constructor(props, context) {
      super(props);
    }

    render() {
      return ( <Component {...this.props} /> );
    }
  }
};

export default containerModel
