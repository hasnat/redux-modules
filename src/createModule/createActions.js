import createAction from './createAction';
import { reduce } from 'ramda';
import camelize from 'camel-case';
import payloadPropchecker from './payloadPropchecker';

const onError = err => {
  console.error(
    'Warning: Failed payloadType:',
    err
  );
}

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    middleware,
    formattedConstant: actionName,
  } = transformation;
  const camelizedActionName = camelize(action);

  generatedActions[camelizedActionName] = createAction(
    actionName,
    middleware
  );

  return generatedActions;
};

export const createActions = transformations => {
  return reduce(_generateActions, {}, transformations);
};


export default createActions;
