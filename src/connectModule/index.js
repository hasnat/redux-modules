import connectModules from './connectModules';

const createSelectorOrDefault = ({ name, selector }) => {
  if (typeof selector === 'function') {
    return selector;
  }
  return state => state[name];
};

const createModuleSelector = modules => {
  if (modules.length === 1) {
    return createSelectorOrDefault(modules[0]);
  }
  const selectors = {};
  for (let i = 0; i < modules.length; ++i) {
    const module = modules[i];
    selectors[module.name] = createSelectorOrDefault(module);
  }
  const keys = Object.keys(selectors);
  return state => {
    const props = {};
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const selector = selectors[key];
      props[key] = selector(state);
    }
    return props;
  };
};

export const connectModule = (selector, modules) => {
  let formattedSelector;
  let formattedModules;
  if (typeof modules === 'undefined') {
    formattedModules = Array.isArray(selector) ? selector : [selector];
    formattedSelector = createModuleSelector(formattedModules);
  } else {
    formattedSelector = selector;
    formattedModules = Array.isArray(modules) ? modules : [modules];
  }
  return Component => connectModules(formattedSelector, formattedModules, Component);
};

export default connectModule;
