const defaultMiddleware = action => action;
const createAction = (actionName, middleware = [ defaultMiddleware ]) =>
  (payload, meta) => {
    return {
      type: actionName,
      ... middleware.reduce((acc, func) => func(acc), {payload, meta}),
    };
  }

export default createAction;
