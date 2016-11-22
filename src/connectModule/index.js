import { get, mapValues } from 'lodash';

import connectModules from './connectModules';
import toObject from '../utils/toObject';

function getSelector(module) {
  return get(module, 'selector', () => Object.create(null));
}

function createModuleSelector(modules) {
  if (!Array.isArray(modules)) {
    return getSelector(modules);
  }
  if (modules.length === 1) {
    return getSelector(modules[0]);
  }
  const selectorMap = toObject(modules, 'name', getSelector);
  return function moduleSelector(state, props) {
    return mapValues(selectorMap, selector => selector(state, props));
  };
}

export default function connectModule(selector, modules) {
  if (typeof modules === 'undefined') {
    const formattedSelector = createModuleSelector(selector);
    return connectModule(formattedSelector, selector);
  }
  const formattedModules = Array.isArray(modules) ? modules : [modules];
  return connectModules(selector, formattedModules);
}
