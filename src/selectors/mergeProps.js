import deepAssign from 'deep-assign';

export const mergeProps =
  (stateProps, dispatchProps, ownProps) =>
    deepAssign({}, stateProps, dispatchProps, ownProps);

export default mergeProps;
