import deepAssign from 'deep-assign';

import createGetState from './createMapStateToProps';

export default function createFinalPropsSelector(mapStateToProps, mapDispatchToProps) {
  const getState = createGetState(mapStateToProps);
  let dispatch;
  let lastMerged;
  let lastOwn;
  let lastState;
  return function finalPropsSelector(state, props) {
    const nextState = getState(state, props);
    if (typeof dispatch === 'undefined') {
      dispatch = mapDispatchToProps(dispatch, props);
    }
    if (lastOwn !== props || lastState !== nextState) {
      lastMerged = deepAssign({}, nextState, dispatch, props);
      lastOwn = props;
      lastState = nextState;
    }
    return lastMerged;
  };
}
