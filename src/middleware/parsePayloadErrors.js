const parsePayloadErrors = action => ({
  ...action,
  error: (action.payload instanceof Error),
});

export default parsePayloadErrors;
