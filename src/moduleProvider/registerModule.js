import { curry, compose, reduce } from 'ramda';
import { combineReducers } from 'redux';

const registeredModules = {};

const updateRegisteredModules = reducerHash => {
  Object.assign(registeredModules, reducerHash);
  return reducerHash;
};

const moduleIsRegistered = name => {
  const registeredModuleNames = Object.keys(registeredModules);
  return registeredModuleNames.indexOf(name) !== -1;
};

const reducerShouldBeReplaced = modules =>
  modules.reduce((shouldReplace, { name }) => {
    // If module isn't currently registered, reducer should be replaced
    if (!moduleIsRegistered(name)) { return true; }
    return shouldReplace;
  }, false);

const collectReducers = (reducer, module) => {
  // If reducer is already registered, return
  if (reducer[module.name]) { return reducer; }
  return {
    ... reducer,
    [module.name]: module.reducer,
  };
};

function recalculateReducers(store, modules) {
  if (!reducerShouldBeReplaced(modules)) { return; }
  console.info('Replacing reducers');

  const reducer = compose(
    combineReducers,
    updateRegisteredModules,
    reduce(collectReducers, registeredModules)
  )(modules);

  store.replaceReducer(reducer);
}

export default curry(recalculateReducers);
