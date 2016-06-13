import { compose } from 'ramda';
import createActions from './createActions';
import createReducer from './createReducer';
import createConstants from './createConstants';
import formatConstants from './formatConstants';
import { Map } from 'immutable';

const generateReduxComponents = (name, initialState) => transformations => {
  const generated = {
    name,
    actions: createActions(transformations),
    reducer: createReducer(initialState, transformations),
    constants: createConstants(transformations),
  };

  return generated;
};

// eslint-disable-next-line new-cap
export const createModule = ({ name, transformations, initialState = Map() }) => {
  const generated = compose(
    generateReduxComponents(name, initialState),
    formatConstants(name)
  )(transformations);

  return generated;
};

export default createModule;
