const defaultOnError = err => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = (onError = defaultOnError) =>
  ({ payloadTypes, formattedConstant }, { payload, meta }) => {
    // Object.keys may be preferable in cases where payloadTypes has a prototype chain
    for (const key in payloadTypes) {
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
