const createAction = (transform, middleware = []) =>
  (payload, meta) => ({
    type: transform.formattedConstant,
    ...middleware.reduce((acc, func) => func(transform, acc), { payload, meta }),
  });

export default createAction;
