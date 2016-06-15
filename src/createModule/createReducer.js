const reduceTransformations = (reducerMap, { formattedConstant, reducer }) => {
  // eslint-disable-next-line no-param-reassign
  reducerMap[formattedConstant] = reducer;
  return reducerMap;
};

export const createReducer = (initialState, transformations) => {
  const reducerMap = transformations.reduce(reduceTransformations, {});
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return typeof reducer !== 'undefined' ?
      reducer(state, action) :
      state;
  };
};

export default createReducer;
