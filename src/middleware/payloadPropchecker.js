const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = (payloadTypes, { onError = defaultOnError }) =>
  ({ payload, meta, type, ...rest }) => {
    if (!payloadTypes) {
      return { payload, meta };
    }

    // If payloadTypes is a propcheck function
    else if (typeof payloadTypes === 'function') {
      const result = payloadTypes({ payload }, 'payload', type, 'key') || {};
      const { message } = result;
      if (message) {
        onError(message);
      }
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
        const { message } = propChecker(payload, key, type, 'key') || {};
        if (message) {
          onError(message);
        }
      }
    }

    return { payload, meta, type, ...rest };
  };

export default propCheckedPayloadCreator;
