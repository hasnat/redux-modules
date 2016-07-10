const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = ({ onError = defaultOnError, payloadTypes }) =>
  ({ type, payload, meta }) => {
    if (typeof payloadTypes === 'undefined') {
      return { payload, meta };
    }
    const keys = Object.keys(payloadTypes);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const propChecker = payloadTypes[key];
      if (typeof propChecker === 'undefined') {
        continue;
      }
      const { message } = propChecker(payload, key, type, 'prop') || {};
      if (message) {
        onError(message);
      }
    }

    return { payload, meta };
  };

export default propCheckedPayloadCreator;
