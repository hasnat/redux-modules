import createAction from './createAction';
import { reduce } from 'ramda';
import camelize from 'camel-case';
import payloadPropchecker from './payloadPropchecker';

const parsePayloadErrors = (transformation, { payload, meta }) => {
  return {
    payload,
    meta,
    error: (payload instanceof Error),
  };
};

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    metaTypes = {},
    middleware = [],
    formattedConstant: actionName,
  } = transformation;

  const camelizedActionName = camelize(action);
  const defaultMiddlewares = [
    payloadPropchecker(),
    parsePayloadErrors,
  ];

  generatedActions[camelizedActionName] = createAction(
    transformation,
    middleware.concat(defaultMiddlewares)
  );

  return generatedActions;
};

export const createActions = transformations => {
  return reduce(_generateActions, {}, transformations);
};


export default createActions;
