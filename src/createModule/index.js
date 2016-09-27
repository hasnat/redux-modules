import camelize from 'camel-case';
import createAction from './createAction';
import parsePayloadErrors from '../middleware/parsePayloadErrors';
import propCheck from '../middleware/propCheck';

const defaultMiddleware = [parsePayloadErrors];
const defaultReducer = state => state;

const applyReducerEnhancer = (reducer, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(reducer);
  }
  return reducer;
};

const formatTransformation = (name, { action, type, ...transformation }) => ({
  formattedConstant: `${name}/${type || action}`,
  type: type || action,
  action,
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
  composes = [],
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
        action,
        type,
        namespaced = true,
        formattedConstant,
        reducer,
        payloadTypes,
        middleware = [],
      } = transformation;

    const finalMiddleware = [... defaultMiddleware, ... middleware];
    const constant = namespaced ? formattedConstant : type;

    // DEPRECATION WARNINGS
    if (process.env.NODE_ENV !== 'production') {
      action && console.warn(
      `${constant}::`,
      'The `action` key is deprecated. Use `type` instead.'
    );

      if (payloadTypes) {
        console.warn(
          `${constant}::`,
          'The `payloadTypes` key is deprecated. Use middleware.propCheck instead'
        );
        const propChecker = propCheck(transformation.payloadTypes);
        finalMiddleware.push(propChecker);
      }
    }

    const camelizedActionName = camelize(type);
    actions[camelizedActionName] = createAction(constant, finalMiddleware);
    constants[camelizedActionName] = constant;
    reducerMap[constant] = applyReducerEnhancer(reducer, reducerEnhancer);
  }

  const reducer = (state = initialState, action) => {
    const localReducer = reducerMap[action.type] || defaultReducer;
    return [
      localReducer,
      ... composes,
    ].reduce((newState, currentReducer) => currentReducer(newState, action), state);
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
