import createAction from './createAction';
import map from 'lodash.map';
import snakeCase from 'lodash.snakecase';
import parsePayloadErrors from '../middleware/parsePayloadErrors';

const defaultReducer = state => state;

const applyReducerEnhancer = (reducer, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(reducer);
  }
  return reducer;
};

function formatType(actionName) {
  return snakeCase(actionName).toUpperCase();
}

function parseTransformation(transformation, actionName) {
  if (typeof actionName !== 'string') {
    throw new Error('`transformations` value must be an object');
  }

  const type = formatType(actionName);

  if (typeof transformation === 'function') {
    return { actionName, reducer: transformation, type };
  }

  return Object.assign({}, transformation, { actionName, type });
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
  const parsedTransformations = map(transformations, parseTransformation);
  const actions = {};
  const constants = {};
  const reducerMap = {};

  parsedTransformations.forEach(
    ({ actionName, middleware = [], namespaced = true, reducer, type }) => {
      const finalMiddleware = [parsePayloadErrors, ...middleware, ...moduleMiddleware];
      const constant = namespaced ? `${name}/${type}` : type;
      actions[actionName] = createAction(constant, finalMiddleware);
      constants[actionName] = constant;
      reducerMap[constant] = reducer;
    });

  function finalReducer(state = initialState, action) {
    const localReducer = reducerMap[action.type] || defaultReducer;
    return [localReducer, ...composes]
      .reduce((newState, currentReducer) => currentReducer(newState, action), state);
  }

  return {
    actions,
    constants,
    name,
    reducer: applyReducerEnhancer(finalReducer, reducerEnhancer),
    selector,
  };
}
