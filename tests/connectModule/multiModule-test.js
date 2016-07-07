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

const generateMockModule = id => createModule({
  name: `mock${id}`,
  initialState: 0,
  transformations: [
    { type: 'INCREMENT', reducer: state => state + 1 },
    { type: 'DECREMENT', reducer: state => state - 1 },
  ],
});

const store = createStore(state => state, {});
const selector = state => state;
const Component = () => <div>Hello world.</div>;

describe('ConnectedComponent', () => {
  describe('Multi Module with selector', () => {
    const Multi = connectModule(selector, [
      generateMockModule(1),
      generateMockModule(2),
    ])(Component);

    const wrapper = mount(
      <ModuleProvider store={store}>
        <Multi />
      </ModuleProvider>
    );

    const child = wrapper.findWhere(node => node.type() === Component);
    const props = child.props();
    const actions = child.props().actions;

    it('should pass selector props', () => {
      expect(props).to.contain({ mock1: 0, mock2: 0 });
    });

    it('should pass namespaced dispatched actions', () => {
      expect(props).to.contain.keys('actions');
      expect(actions).to.contain.keys(['mock1', 'mock2']);
      expect(actions.mock1).to.contain.keys(['increment', 'decrement']);
      expect(actions.mock2).to.contain.keys(['increment', 'decrement']);
    });
  });

  describe('Multi Module without selector', () => {
    const Multi = connectModule([
      generateMockModule(1),
      generateMockModule(2),
    ])(Component);

    const wrapper = mount(
      <ModuleProvider store={store}>
        <Multi />
      </ModuleProvider>
    );

    const child = wrapper.findWhere(node => node.type() === Component);
    const props = child.props();
    const actions = child.props().actions;

    it('should only pass dispatched actions', () => {
      expect(props).to.contain.keys('actions');
      expect(actions).to.contain.keys(['mock1', 'mock2']);
    });

    it('should pass namespaced dispatched actions', () => {
      expect(props).to.contain.keys('actions');
      expect(actions).to.contain.keys(['mock1', 'mock2']);
      expect(actions.mock1).to.contain.keys(['increment', 'decrement']);
      expect(actions.mock2).to.contain.keys(['increment', 'decrement']);
    });
  });
});
