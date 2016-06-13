import { keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => {};
const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

const createPropCheck = (formattedConstant, onError) => (payloadTypes, payload) => type => {
  const propChecker = payloadTypes[type] || defaultPropCheck;
  const typeError = propChecker(payload, type, formattedConstant, 'prop') || {};
  const { message } = typeError;

  if (message) {
    onError(message);
  }
};

export const propCheckedPayloadCreator = (onError = defaultOnError) =>
  ({ payloadTypes, formattedConstant }, { payload, meta }) => {
    const propCheck = createPropCheck(formattedConstant, onError);

    compose(
      forEach(propCheck(payloadTypes, payload)),
      keys
    )(payloadTypes);

    return { payload, meta };
  };

export default propCheckedPayloadCreator;
