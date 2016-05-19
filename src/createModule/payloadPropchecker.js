import { curry, keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => { return {}; };
const defaultOnError = err => {
  console.error(
    'Warning: Failed payloadType:',
    err
  );
};

export const propCheckedPayloadCreator = (onError = defaultOnError) =>
  (transform, {payload, meta}) => {
    const _propCheck = (payloadTypes, payload) => type => {
      const propChecker = payloadTypes[type] || defaultPropCheck;
      const typeError = propChecker(payload, type, transform.formattedConstant, 'prop') || {};
      const { message } = typeError;

      message && onError(message);
    }

    compose(
      forEach(_propCheck(transform.payloadTypes, payload)),
      keys
    )(transform.payloadTypes);

    if (meta) {
      compose (
        forEach(_propCheck(metaTypes, meta)),
        keys
      )(metaTypes)
    }

    return { payload, meta };
  }

export default propCheckedPayloadCreator;
