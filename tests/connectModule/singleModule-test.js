import React from 'react';
import { createStore } from 'redux';
import { expect, should } from 'chai';
import { ModuleProvider, connectModule, createModule } from '../../src';
import { mount } from 'enzyme';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

should();

const mockModule = createModule({
  name: 'mock',
  initialState: 0,
  transformations: {
    decrement: state => state - 1,
    increment: state => state + 1,
  },
});
const store = createStore(state => state, {});
const selector = state => ({ count: state.mock });
const Component = () => <div>Hello world.</div>;

describe('ConnectedComponent', () => {
  describe('Single Module with selector', () => {
    const Single = connectModule(selector, mockModule)(Component);
    const wrapper = mount(
      <ModuleProvider store={store}>
        <div>
          <Single />
        </div>
      </ModuleProvider>
    );
    const child = wrapper.findWhere(node => node.type() === Component);
    const props = child.props();
    const actions = props.actions;

    it('should pass selector props', () => {
      expect(props.count).to.equal(0);
    });

    it('should pass dispatched actions', () => {
      expect(props).to.contain.keys('actions');
      expect(actions).to.contain.keys(['increment', 'decrement']);
    });
  });

  describe('Single Module without a selector', () => {
    const Single = connectModule(mockModule)(Component);
    const wrapper = mount(
      <ModuleProvider store={store}>
        <div>
          <Single />
        </div>
      </ModuleProvider>
    );
    const child = wrapper.findWhere(node => node.type() === Component);

    it('should only pass dispatched actions', () => {
      expect(Object.keys(child.props())).to.deep.equal(['actions']);
      expect(child.props().actions).to.contain.keys(['increment', 'decrement']);
    });
  });

  describe('Single Module a selector and passed props', () => {
    const Single = connectModule(() => ({ count: 0, foo: 2 }), mockModule)(Component);
    const wrapper = mount(
      <ModuleProvider store={store}>
        <div>
          <Single count={1} dispatch={() => { }} />
        </div>
      </ModuleProvider>
    );
    const child = wrapper.findWhere(node => node.type() === Component);

    it('should only pass dispatched actions', () => {
      expect(child.props()).to.contain.keys(['actions']);
      expect(child.props().actions).to.contain.keys(['increment', 'decrement']);
    });

    it('should prefer passed props over selector props', () => {
      expect(child.props().count).to.equal(1);
      expect(child.props().foo).to.equal(2);
    });
  });
});
