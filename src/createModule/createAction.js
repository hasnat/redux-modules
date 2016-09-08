const createAction = (formattedConstant, actionMiddleware = []) =>
  (payload, meta) => ({
    ...actionMiddleware.reduce(
      (acc, func) => func(acc),
      { payload, meta, type: formattedConstant }),
  });

export default createAction;
