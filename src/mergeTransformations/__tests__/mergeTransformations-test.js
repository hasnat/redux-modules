import { describe, it } from 'mocha';
import { expect } from 'chai';
import mergeTransformations from '../mergeTransformations';

const xforms1 = [
  {
    action: 'transform one',
    reducer: state => state,
  },
  {
    action: 'transform two',
    payloadTypes: {
      foo: 'bar',
    },
    reducer: (state, action) => state + action,
  },
];

const xforms2 = [
  {
    action: 'transform two',
    payloadTypes: {
      baz: 'bam',
    },
    reducer: (state, action) => state + action,
  },
  {
    action: 'transform three',
    reducer: state => state,
  },
];

describe('mergeTransformations', () => {
  const merged = mergeTransformations([xforms1], xforms2);
  const transformToTest = merged.find(trans => trans.action === 'transform two');
  console.log('output', merged);
  it('should merge transformation arrays', () => {
    expect(merged.length).to.equal(3);
  });

  it('should combine reducer functions', () => {
    expect(transformToTest.reducer(1, 2)).to.equal(5);
  });

  it('should merge payload types', () => {
    expect(transformToTest.payloadTypes).to.deep.equal({
      foo: 'bar',
      baz: 'bam',
    });
  });
});

