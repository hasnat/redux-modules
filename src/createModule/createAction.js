const createAction = (actionName, middleware = []) =>
  (payload, meta) => {
    return {
      type: actionName,
      ... middleware.reduce((acc, func) => func(acc), {payload, meta}),
    };
  }

export default createAction;
