import { flow } from 'lodash';

export default function createAction(type, actionMiddleware = []) {
  const middleware = flow(actionMiddleware);
  return function actionCreator(payload, meta) {
    return middleware({
      meta,
      payload,
      type,
    });
  };
}
