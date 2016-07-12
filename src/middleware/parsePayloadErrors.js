const parsePayloadErrors = (transformation, { payload, meta }) => ({
  payload,
  meta,
  error: (payload instanceof Error),
});

export default parsePayloadErrors;
