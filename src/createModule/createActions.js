import createAction from './createAction';
import { reduce } from 'ramda';
import camelize from 'camel-case';
import payloadPropchecker from './payloadPropchecker';

const parsePayloadErrors = (transformation, { payload, meta }) => ({
  payload,
  meta,
  error: (payload instanceof Error),
});

const generateActions = (generatedActions, transformation) => {
  const {
    action,
    middleware = [],
  } = transformation;

  const camelizedActionName = camelize(action);
  const defaultMiddlewares = [
    payloadPropchecker(),
    parsePayloadErrors,
  ];

  // eslint-disable-next-line no-param-reassign
  generatedActions[camelizedActionName] = createAction(
    transformation,
    middleware.concat(defaultMiddlewares)
  );

  return generatedActions;
};

export const createActions = transformations => reduce(generateActions, {}, transformations);

export default createActions;
