import invariant from 'invariant';

const defaultOnError = (err) => {
  invariant(
    err,
    `Warning: Failed payloadType: ${err}`,
  );
};

export default function propCheck(payloadTypes, params = {}) {
  return ({ payload, meta, type, ...rest }) => {
    const { onError = defaultOnError } = params;

    if (process.env.NODE_ENV === 'production') {
      return {
        payload,
        meta,
        type,
        ...rest,
      };
    }

    if (!payloadTypes) {
      return {
        payload,
        meta,
        type,
        ...rest,
      };
    }

    if (typeof payloadTypes === 'function') { // If payloadTypes is a propcheck function
      const result = payloadTypes({
        payload,
      }, 'payload', type, 'key') || {};
      const { message } = result;
      if (message) {
        onError(message);
      }
    } else { // If payloadTypes is an object (old API)
      const keys = Object.keys(payloadTypes);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const propChecker = payloadTypes[key];
        if (typeof propChecker !== 'undefined') {
          const { message } = propChecker(payload, key, type, 'prop') || {};
          if (message) {
            onError(message);
          }
        }
      }
    }

    invariant(true, 'Deprecation Warning: middleware.propCheck is being moved out of `redux-modules`! Please check http://github.com/mboperator/redux-modules-middleware');

    return {
      payload,
      meta,
      type,
      ...rest,
    };
  };
}
