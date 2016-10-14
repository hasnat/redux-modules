import createAction from './createAction';
import { camelCase, map } from 'lodash';
import parsePayloadErrors from '../middleware/parsePayloadErrors';
import propCheck from '../middleware/propCheck';

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

function parseTransformations(transformations) {
  function parseTransformation(type, transformation) {
    return (typeof transformation === 'function') ?
      { type, reducer: transformation } :
      { type, ...transformation };
  }
  return Array.isArray(transformations) ?
    transformations :
    map(transformations, parseTransformation);
}

export default function createModule({
  composes = [],
  initialState,
  middleware: moduleMiddleware = [],
  name,
  reducerEnhancer,
  selector,
  transformations,
}) {
  const finalTransformations = parseTransformations(transformations);
  const actions = {};
  const constants = {};
  const reducerMap = {};
  for (let i = 0; i < finalTransformations.length; ++i) {
    const {
      action,
      formattedConstant,
      middleware = [],
      namespaced = true,
      payloadTypes,
      reducer,
      type,
    } = formatTransformation(name, finalTransformations[i]);

    const finalMiddleware = [
      parsePayloadErrors,
      ...middleware,
      ...moduleMiddleware,
    ];

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
        const propChecker = propCheck(payloadTypes);
        finalMiddleware.push(propChecker);
      }
    }

    const camelizedActionName = camelCase(type);
    actions[camelizedActionName] = createAction(constant, finalMiddleware);
    constants[camelizedActionName] = constant;
    reducerMap[constant] = reducer;
  }
  const reducer = (state = initialState, action) => {
    const localReducer = reducerMap[action.type] || defaultReducer;
    return [
      localReducer,
      ...composes,
    ].reduce((newState, currentReducer) => currentReducer(newState, action), state);
  };
  return {
    actions,
    constants,
    name,
    reducer: applyReducerEnhancer(reducer, reducerEnhancer),
    selector,
  };
}
