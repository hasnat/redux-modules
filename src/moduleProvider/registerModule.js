import { combineReducers } from 'redux';

let registeredModules = {};

const moduleIsRegistered = ({ name }) =>
  registeredModules.hasOwnProperty(name);

const reducerShouldBeReplaced = modules =>
  !modules.some(moduleIsRegistered);

const collectReducers = ({ name, reducer }) => {
  // If reducer is already registered, return
  if (typeof reducer[name] !== 'undefined') {
    return registeredModules;
  }
  return {
    ...registeredModules,
    [name]: reducer,
  };
};

const recalculateReducers = store => modules => {
  if (!reducerShouldBeReplaced(modules)) {
    return;
  }
  // eslint-disable-next-line no-console
  console.info('Replacing reducers');
  for (let i = 0; i < modules.length; ++i) {
    registeredModules = collectReducers(modules[i]);
  }
  const reducer = combineReducers(registeredModules);
  store.replaceReducer(reducer);
};

export default recalculateReducers;
