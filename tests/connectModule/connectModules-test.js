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

  describe('usage with one module', () => {
    it('still needs to be tested');
  });

  describe('usage with n modules', () => {
    it('still needs to be tested');
  });
});
