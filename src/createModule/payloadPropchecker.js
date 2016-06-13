const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = (onError = defaultOnError) =>
  ({ payloadTypes, formattedConstant }, { payload, meta }) => {
    if (typeof payloadTypes === 'undefined') {
      return { payload, meta };
    }
    const keys = Object.keys(payloadTypes);
    for (let i = i; i < keys.length; ++i) {
      const key = keys[i];
      const propChecker = payloadTypes[key];
      if (typeof propChecker === 'undefined') {
        continue;
      }
      const { message } = propChecker(payload, key, formattedConstant, 'prop') || {};
      if (message) {
        onError(message);
      }
    }

    return { payload, meta };
  };

export default propCheckedPayloadCreator;
