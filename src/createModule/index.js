import camelize from 'camel-case';
import createAction from './createAction';
import parsePayloadErrors from '../middleware/parsePayloadErrors';

const defaultMiddleware = [parsePayloadErrors];

const applyReducerEnhancer = (reducer, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(reducer);
  }
  return reducer;
};

const formatTransformation = (name, { type, ...transformation }) => ({
  formattedConstant: name ? `${name}/${type}` : type,
  type,
  ...transformation,
});

const parseTransformation = (type, transformation) => {
  if (typeof transformation === 'function') {
    return {
      type,
      reducer: transformation,
    };
  }
  return {
    type,
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

export const createModule = ({
  initialState,
  reducerEnhancer,
  name,
  selector,
  transformations,
}) => {
  const actions = {};
  const constants = {};
  const reducerMap = {};

  const finalTransformations = parseTransformations(transformations);
  for (let i = 0; i < finalTransformations.length; ++i) {
    const transformation = formatTransformation(name, finalTransformations[i]);
    const {
        type,
        formattedConstant,
        reducer,
        middleware = [],
      } = transformation;

    const finalMiddleware = [... defaultMiddleware, ... middleware];

    const camelizedActionName = camelize(type);
    actions[camelizedActionName] = createAction(formattedConstant, finalMiddleware);
    constants[camelizedActionName] = formattedConstant;
    reducerMap[formattedConstant] = applyReducerEnhancer(reducer, reducerEnhancer);
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
