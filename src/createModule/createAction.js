const createAction = (transform, middleware = []) =>
  (payload, meta) => {
    return {
      type: transform.formattedConstant,
      ... middleware.reduce((acc, func) => func(transform, acc), { payload, meta }),
    };
  }

export default createAction;
