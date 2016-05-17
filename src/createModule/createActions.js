import createAction from './createAction';
import { reduce } from 'ramda';
import camelize from 'camel-case';
import payloadPropchecker from './payloadPropchecker';

const parsePayloadErrors = ({payload, meta}) => {
  return {
    payload,
    meta,
    error: (payload instanceof Error),
  };
};

const onError = err => {
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    middleware = [],
    formattedConstant: actionName,
  } = transformation;

  const camelizedActionName = camelize(action);
  const defaultMiddlewares = [
    payloadPropchecker({actionName, payloadTypes, onError}),
    parsePayloadErrors,
  ];

  generatedActions[camelizedActionName] = createAction(
    actionName,
    middleware.concat(defaultMiddlewares)
  );

  return generatedActions;
};

export const createActions = transformations => {
  return reduce(_generateActions, {}, transformations);
};


export default createActions;
