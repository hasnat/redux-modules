import connectModules from './connectModules';

const createModuleSelector = modules => {
  const moduleNames = modules.map(module => module.name);
  // If there's only one module (as in most cases), use a simple accessor
  if (moduleNames.length === 1) {
    const name = moduleNames[0];
    return state => state[name];
  }
  // If https://github.com/reactjs/react-redux/issues/407 makes it, reselect can be used here
  return state => moduleNames.reduce(
    (props, name) => Object.assign(props, state[name]), {});
};

export const connectModule = (selector, modules) => {
  let formattedSelector = selector;
  let formattedModules = Array.isArray(modules) ? modules : [modules];
  if (typeof selector === 'object' && typeof modules === 'undefined') {
    formattedModules = Array.isArray(selector) ? selector : [selector];
    formattedSelector = createModuleSelector(formattedModules);
  }
  return Component => connectModules(formattedSelector, formattedModules, Component);
};

export default connectModule;
