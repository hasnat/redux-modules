import PropTypes from 'prop-types';

const defaultOnError = (err) => {
  // eslint-disable-next-line no-console
  console.error(
    'Warning: Failed payloadType:',
    err,
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

    if (typeof payloadTypes === 'function') {
      PropTypes.checkPropTypes({ payload: payloadTypes }, { payload }, '', type, () => onError(type));
    } else {
      PropTypes.checkPropTypes(payloadTypes, payload, '', type, () => onError(type));
    }

    return {
      payload,
      meta,
      type,
      ...rest,
    };
  };
}
