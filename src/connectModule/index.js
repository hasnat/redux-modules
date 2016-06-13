import { curry } from 'ramda';
import _connectModules from './connectModules';

export const connectModule = (selector, modules, Component) => {
  const formatted = Array.isArray(modules) ? modules : [modules];
  return _connectModules({ selector, modules: formatted }, Component);
};

export default curry(connectModule);
