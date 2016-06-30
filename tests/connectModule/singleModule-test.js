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
  transformations: [
    { action: 'INCREMENT', reducer: state => state + 1 },
    { action: 'DECREMENT', reducer: state => state - 1 },
  ],
});
const store = createStore(state => state, {});
const selector = state => ({ count: state.mock });
const Component = () => <div>Hello world.</div>;

describe('ConnectedComponent', () => {
  describe('Single Module with selector', () => {
    const Single = connectModule(selector, mockModule)(Component);
    const wrapper = mount(
      <ModuleProvider store={store}>
        <Single />
      </ModuleProvider>
    );
    const child = wrapper.findWhere(node => node.type() === Component);
    const props = child.props();
    const actions = props.actions;

    it('Should pass selector props', () => {
      expect(props).to.contain({ count: 0 });
    });

    it('Should pass dispatched actions', () => {
      expect(props).to.contain.keys('actions');
      expect(actions).to.contain.keys(['increment', 'decrement']);
    });
  });

  describe('Single Module without a selector', () => {
    const Single = connectModule(mockModule)(Component);
    const wrapper = mount(
      <ModuleProvider store={store}>
        <Single />
      </ModuleProvider>
    );
    const child = wrapper.findWhere(node => node.type() === Component);
    const props = child.props();
    const actions = props.actions;

    it('Should only pass dispatched actions', () => {
      expect(props).to.contain.keys(['actions']);
      expect(actions).to.contain.keys(['increment', 'decrement']);
    });
  });
});
