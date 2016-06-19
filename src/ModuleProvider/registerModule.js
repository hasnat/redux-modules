const registerModule = (store, combineReducers, staticReducers) => {
  const registeredModules = { ...staticReducers };
  const moduleIsUnregistered = ({ name }) =>
    !registeredModules.hasOwnProperty(name);

  return modules => {
    const unregisteredModules = modules.filter(moduleIsUnregistered);
    if (unregisteredModules.length === 0) {
      return;
    }
    for (let i = 0; i < unregisteredModules.length; ++i) {
      const { name, reducer } = unregisteredModules[i];
      registeredModules[name] = reducer;
    }
    const reducer = combineReducers(registeredModules);
    store.replaceReducer(reducer);
  };
};

export default registerModule;
