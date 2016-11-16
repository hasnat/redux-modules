import connectModules from './connectModules';

export const createModuleSelector = (modules) => {
  if (modules.length === 1) {
    return modules[0].selector || (() => ({}));
  }

  const selectors = modules
    .filter(m => m.selector)
    .map(
      ({ selector, name }) => ({
        selector,
        name,
      }),
  );

  return (state, props) => selectors
    .reduce((acc, { selector, name }) => ({
      ...acc,
      [name]: selector(state, props),
    }), {});
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
  return connectModules(formattedSelector, formattedModules);
};

export default connectModule;
