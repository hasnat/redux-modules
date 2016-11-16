import deepAssign from 'deep-assign';

export default function mergeProps(stateProps, dispatchProps, ownProps) {
  return deepAssign({}, stateProps, dispatchProps, ownProps);
}
