import mergeProps from './mergeProps';

export default function createFinalPropsSelector({ getState, getDispatch }) {
  let lastOwn;
  let lastState;
  let lastMerged;
  let dispatch;
  return (state, props) => {
    const nextOwn = props;
    const nextState = getState(state, props);

    if (typeof dispatch === 'undefined') {
      dispatch = getDispatch(props);
    }

    if (lastOwn !== nextOwn || lastState !== nextState) {
      lastMerged = mergeProps(nextState, dispatch, nextOwn);
      lastOwn = nextOwn;
      lastState = nextState;
    }
    return lastMerged;
  };
}
