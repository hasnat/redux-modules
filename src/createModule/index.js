import camelize from 'camel-case';
import createAction from './createAction';
import parsePayloadErrors from '../middleware/parsePayloadErrors';
import propCheck from '../middleware/propCheck';

const defaultMiddleware = [parsePayloadErrors];

const formatTransformation = (name, { action, type, ...transformation }) => ({
  formattedConstant: `${name}/${type || action}`,
  type: type || action,
  action,
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
  const actions = {};
  const constants = {};
  const reducerMap = {};

  const finalTransformations = parseTransformations(transformations);
  for (let i = 0; i < finalTransformations.length; ++i) {
    const transformation = formatTransformation(name, finalTransformations[i]);
    const {
        action,
        type,
        formattedConstant,
        reducer,
        payloadTypes,
        middleware = [],
      } = transformation;

    const finalMiddleware = defaultMiddleware.concat(middleware);

    // DEPRECATION WARNINGS
    if (process.env.NODE_ENV !== 'production') {
      action && console.warn('The `action` key is deprecated. Use `type` instead.');

      if (payloadTypes) {
        console.warn('The `payloadTypes` key is deprecated. Use middleware.propCheck instead');
        const propChecker = propCheck(transformation.payloadTypes);
        finalMiddleware.push(propChecker);
      }
    }


    const camelizedActionName = camelize(type);
    actions[camelizedActionName] = createAction(transformation, finalMiddleware);
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
