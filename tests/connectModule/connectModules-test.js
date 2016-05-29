import React from 'react';
import { expect, should } from 'chai';
import { createModule, connectModule } from '../../src';

should();

const mockModule = createModule({
  name: 'mock',
  initialState: 0,
  transformations: [
    { action: 'INCREMENT', reducer: state => state + 1},
    { action: 'DECREMENT', reducer: state => state - 1},
  ],
});

const selector = state => { return { count: state } };

const MockComponent = props => (
  <div>
    {JSON.stringify(props)}
  </div>
);

describe('connectModules', () => {
  it('accepts three parameters', () => {
    expect(connectModule.length).to.equal(3);
  });

  describe('function result', () => {
    it('should return a connected component');

    it('should work with a single module');

    it('should work with multiple modules');

  });

  describe('generated props', () => {
    it('combine selector, dispatch, and passed props correctly');

    it('should namespace actions under module name');

    it('should deeply merge selector and dispatch keys');
  });
});
