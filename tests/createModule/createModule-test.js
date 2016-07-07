import { should } from 'chai';
import { Map } from 'immutable';
import createModule from '../../src/createModule';
should();

const mockTransforms = [
  { type: 'MOCK_ONE' },
  { type: 'MOCK_TWO' },
];

describe('createModule', () => {
  const generatedModule = createModule({
    name: 'mock',
    // eslint-disable-next-line new-cap
    initialState: Map(),
    transformations: mockTransforms,
  });
  it('should generate an actions object', () => {
    generatedModule.actions.should.not.equal(null);
    (typeof generatedModule.actions).should.equal('object');
  });
  it('should generate a reducer function', () => {
    generatedModule.reducer.should.not.equal(null);
    (typeof generatedModule.reducer).should.equal('function');
  });
});
