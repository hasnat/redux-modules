const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = (payloadTypes, { onError = defaultOnError }) =>
  ({ type, payload, meta }) => {
    if (!payloadTypes) {
      return { payload, meta };
    }

    // If payloadTypes is a propcheck function
    else if (typeof payloadTypes === 'function') {
      const { message } = payloadTypes(payload, type, type, 'prop') || {};
      message && onError(message);
    }

    // If payloadTypes is an object (old API)
    else {
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
    }

    return { payload, meta };
  };

export default propCheckedPayloadCreator;
