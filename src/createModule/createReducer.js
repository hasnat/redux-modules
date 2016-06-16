const reduceTransformations = (reducerMap, { formattedConstant, reducer }) => {
  // eslint-disable-next-line no-param-reassign
  reducerMap[formattedConstant] = reducer;
  return reducerMap;
};

const groupChildReducers = childModules =>
  childModules.reduce((acc, mod) => {
    return { ... acc, [mod.module]: mod.reducer };
  }, {});

const defaultReducer = state => state;

export const createReducer = ({
  name,
  initialState,
  transformations,
  childModules = [],
}) => {
  const reducerMap = transformations.reduce(reduceTransformations, {});

  const childReducers = groupChildReducers(childModules);

  return (state = initialState, action) => {
    const [current, ... ancestors] = (action.meta && action.meta.ancestors) || [];

    const newAction = {
      ... action,
      meta: { ... action.meta, ancestors },
    };

    const reducer = reducerMap[action.type] || defaultReducer;

    console.log('ME', name, 'META', current, ancestors);
    if (!ancestors.length) {
      console.log('No more ancestors, running');
      return reducer(state, action);
    } else if (ancestors.length && ancestors[0].name !== name) {
      console.log('Ancestor found, running', ancestors[0].name);
      return childReducers[ancestors[0].name](state, newAction);
    } else {
      return state;
    }
  };
};

export default createReducer;
