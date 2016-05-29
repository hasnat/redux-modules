import deepAssign from 'deep-assign';

const createNamespacedProps =
  (mapStateProps, mapDispatchProps, props) =>
    deepAssign({}, mapStateProps, mapDispatchProps, props);

export default createNamespacedProps;
