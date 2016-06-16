import createActions from './createActions';
import createReducer from './createReducer';
import createConstants from './createConstants';

export const createModule = ({ name, transformations, initialState, childModules }) => {
  const formatTransformation = transformation => ({
    ...transformation,
    formattedConstant: `${name}/${transformation.action}`,
  });
  const formattedTransformations = transformations.map(formatTransformation);
  return {
    name,
    actions: createActions(formattedTransformations),
    reducer: createReducer({
      name,
      initialState,
      childModules,
      transformations: formattedTransformations,
    }),
    constants: createConstants(formattedTransformations),
  };
};

export default createModule;
