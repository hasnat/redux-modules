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

const parseTransformation = (action, transformation) => {
  if (typeof transformation === 'function') {
    return {
      action,
      reducer: transformation,
    };
  }
  return {
    action,
    ...transformation,
  };
};

const parseTransformations = transformations => {
  if (Array.isArray(transformations)) {
    return transformations;
  }
  const finalTransformations = [];
  const keys = Object.keys(transformations);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const transformation = transformations[key];
    const finalTransformation = parseTransformation(key, transformation);
    finalTransformations.push(finalTransformation);
  }
  return finalTransformations;
};

export const createModule = ({ initialState, name, selector, transformations }) => {
  const defaultMiddleware = [parsePayloadErrors];

  if (process.env.NODE_ENV === 'production') {
    defaultMiddleware.push(payloadPropchecker());
  }

  const actions = {};
  const constants = {};
  const reducerMap = {};
  const finalTransformations = parseTransformations(transformations);
  for (let i = 0; i < finalTransformations.length; ++i) {
    const transformation = formatTransformation(name, finalTransformations[i]);
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
