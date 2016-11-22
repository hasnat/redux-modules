import { has, set } from 'lodash';
import { combineReducers as defaultCombineReducers } from 'redux';

export default function createRegisterModule(store, combineReducers = defaultCombineReducers) {
  const registry = Object.create(null);
  return function registerModule(modules) {
    const unregisteredModules = modules.filter(({ name }) => !has(registry, name));
    if (unregisteredModules.length === 0) {
      return;
    }
    unregisteredModules.forEach(({ name, reducer }) => set(registry, name, reducer));
    store.replaceReducer(combineReducers(registry));
  };
}
