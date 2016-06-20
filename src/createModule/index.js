import camelize from 'camel-case';

import createAction from './createAction';
import payloadPropchecker from './payloadPropchecker';

const parsePayloadErrors = (transformation, { payload, meta }) => ({
  payload,
  meta,
  error: (payload instanceof Error),
});

const formatTransformation = (name, transformation) => ({
  formattedConstant: `${name}/${transformation.action}`,
  ...transformation,
});

export const createModule = ({ name, initialState, selector, transformations }) => {
  const defaultMiddleware = [payloadPropchecker(), parsePayloadErrors];
  const actions = {};
  const constants = {};
  const reducerMap = {};
  for (let i = 0; i < transformations.length; ++i) {
    const transformation = formatTransformation(name, transformations[i]);
    const { action, formattedConstant, reducer } = transformation;
    const camelizedActionName = camelize(action);
    actions[camelizedActionName] = createAction(transformation, defaultMiddleware);
    constants[camelizedActionName] = formattedConstant;
    reducerMap[formattedConstant] = reducer;
  }
  const reducer = (state = initialState, action) => {
    const localReducer = reducerMap[action.type];
    return typeof localReducer !== 'undefined' ?
      localReducer(state, action) :
      state;
  };
  return {
    actions,
    constants,
    name,
    reducer,
    selector,
  };
};

export default createModule;
