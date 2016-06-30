import { mapObjIndexed, groupBy, values, compose } from 'ramda';
import reduceReducers from 'reduce-reducers';

const reduceTransformations = (transforms, actionName) =>
  transforms.reduce(
    (result, trans) => ({
      ... result,
      middleware: result.middleware.concat(trans.middleware),
      payloadTypes: {
        ... result.payloadTypes,
        ... trans.payloadTypes,
      },
      reducer: (state, action) => trans.reducer(result.reducer(state, action), action),
    }),
    {
      action: actionName,
      middleware: [],
      payloadTypes: {},
      reducer: state => state,
    }
  );

const mergeTransformations = (transformations, target) => {
  return compose(
    values,
    mapObjIndexed(reduceTransformations),
    groupBy(transform => transform.action)
  )([...transformations, ...target]);
};

export default mergeTransformations;
