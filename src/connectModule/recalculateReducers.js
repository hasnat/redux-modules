import { curry, compose, reduce } from 'ramda';

let registeredModules = {};

const updateRegisteredModules = reducerHash => {
  registeredModules = reducerHash;
}

const _moduleIsRegistered = name => {
  const registeredModuleNames = Object.keys(registeredModules);
  return registeredModuleNames.indexOf(name) === -1;
}

const _reducerShouldBeReplaced = modules =>
  modules.reduce((shouldReplace, { name }) => {
    // If module isn't currently registered, reducer should be replaced
    if (!_moduleIsRegistered(name)) { return true; }
    return shouldReplace;
  }, false);

const collectReducers = (reducer, module) => {
  // If reducer is already registered, return
  if (reducer[module.name]) { return reducer; }
  reducer[module.name] = module.reducer;
  return reducer;
};

export default function recalculateReducers(module, store) {
  if (!_reducerShouldBeReplaced(modules)) { return; }

  return compose(
    store.replaceReducer,
    combineReducers,
    updateRegisteredModules,
    reduce(collectReducers, registeredModules)
  )(modules)
}
