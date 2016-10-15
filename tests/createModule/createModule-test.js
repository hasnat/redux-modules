import { should } from 'chai';
import createModule from '../../src/createModule';
should();

const mirrorAction = (_, action) => action;
const initialState = {};

let transformMiddlewareCalled = false;
let enhancerCalled = false;
let firstMiddlewareCalled = false;
let secondMiddlewareCalled = false;

const generatedModule = createModule({
  name: 'mock',
  // eslint-disable-next-line new-cap
  initialState,
  reducerEnhancer: r => {
    enhancerCalled = true;
    return r;
  },
  middleware: [
    a => {
      firstMiddlewareCalled = true;
      return a;
    },
    a => {
      secondMiddlewareCalled = true;
      return a;
    },
  ],
  transformations: {
    mockOne: {
      middleware: [
        a => {
          transformMiddlewareCalled = true;
          return a;
        },
      ],
      reducer: mirrorAction,
    },
    mockTwo: mirrorAction,
  },
});

describe('createModule', () => {
  it('should generate an actions object', () => {
    generatedModule.actions.should.not.equal(null);
    (typeof generatedModule.actions).should.equal('object');
  });

  it('should generate a reducer function', () => {
    generatedModule.reducer.should.not.equal(null);
    (typeof generatedModule.reducer).should.equal('function');
  });

  it('should call the reducer enhancer function if specified', () => {
    enhancerCalled.should.equal(true);
  });

  describe('generated reducer', () => {
    it('should respond to generated actions', () => {
      const result = generatedModule.reducer(
        undefined,
        generatedModule.actions.mockOne()
      );

      result.should.deep.equal(generatedModule.actions.mockOne());
    });

    it('should return initialState if a transformation is not defined for the action type', () => {
      const result = generatedModule.reducer(
        undefined,
        { type: 'NON EXISTANT' }
      );

      result.should.equal(initialState);
    });

    it('should respond to every possible action that is generated', () => {
      Object.keys(generatedModule.actions).forEach(key => {
        const action = generatedModule.actions[key]();
        const result = generatedModule.reducer(undefined, action);
        result.should.deep.equal(action);
      });
    });
  });

  describe('generated action', () => {
    it('should run all module wide action middleware', () => {
      generatedModule.actions.mockTwo();
      firstMiddlewareCalled.should.equal(true);
      secondMiddlewareCalled.should.equal(true);
    });

    it('should run module specific action middleware', () => {
      generatedModule.actions.mockOne();
      transformMiddlewareCalled.should.equal(true);
    });
  });
});
