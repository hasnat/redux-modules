import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const generateReducer = (generatedReducer, { formattedConstant, reducer }) => {
  // eslint-disable-next-line no-param-reassign
  generatedReducer[formattedConstant] = reducer;
  return generatedReducer;
};

// eslint-disable-next-line new-cap
export const createReducer = (initialState = Map(), transformations) => {
  const reducer = transformations.reduce(generateReducer, {});
  return handleActions(reducer, initialState);
};

export default createReducer;
