import createActions from './createActions';
import createReducer from './createReducer';
import createConstants from './createConstants';

export const createModule = ({ name, transformations, initialState }) => {
  const formatTransformation = transformation => ({
    ...transformation,
    formattedConstant: `${name}/${transformation.action}`,
  });
  const formattedTransformations = transformations.map(formatTransformation);
  return {
    name,
    actions: createActions(formattedTransformations),
    reducer: createReducer(initialState, formattedTransformations),
    constants: createConstants(formattedTransformations),
  };
};

export default createModule;
