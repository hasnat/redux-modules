import connectModules from './connectModules';

export const connectModule = (selector, modules, Component) => {
  const formatted = Array.isArray(modules) ? modules : [modules];
  return connectModules(selector, formatted, Component);
};

export default connectModule;
