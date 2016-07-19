const createAction = (transform, defaultMiddleware = []) => {
  const { formattedConstant, middleware = [] } = transform;
  const actionMiddleware = middleware.concat(defaultMiddleware);
  return (payload, meta) => ({
    ...actionMiddleware.reduce(
      (acc, func) => func(acc),
      { payload, meta, type: formattedConstant }
    ),
  });
};

export default createAction;
