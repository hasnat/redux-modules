import { expect, should } from 'chai';
import createAction from '../../src/createModule/createAction';
should();

const action = 'mock/TEST_ACTION';

describe('createAction', () => {
  const actionNoMiddleware = createAction(action);

  describe('action with no middleware', () => {
    it('should pass the payload through', () => {
      const actionReturn = actionNoMiddleware({foo: 'bar'});

      actionReturn.type.should.equal(action);
      actionReturn.payload.should.deep.equal({foo: 'bar'});
    });
  });

  describe('action with middleware', () => {
    it('should pass payload and meta through middleware stack', () => {
      let payloadReceived;
      let metaReceived;

      const middleware = [
        ({payload, meta}) => {
          payloadReceived = payload;
          metaReceived = meta;
          return { payload, meta };
        }
      ];

      const actionWithMiddleware = createAction(action, middleware);
      actionWithMiddleware({foo: 'bar'}, {thisIs: 'meta'});

      payloadReceived.should.deep.equal({foo: 'bar'});
      metaReceived.should.deep.equal({thisIs: 'meta'});
    });
  });
});
