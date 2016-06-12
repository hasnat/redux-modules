import { Map } from 'immutable';
import { compose, reduce } from 'ramda';
import { handleActions } from 'redux-actions';

const _reduceChildModules = modules => (state, action) => {
  return modules.reduce((newState, module) => {
    return  state.updateIn(
      path,
      slice =>
        module.reducer( slice, module.action(action.payload) );
    }, state);
}

const _generateReducer = (generatedReducer, transformation) => {
  const { formattedConstant, reducer, composes  } = transformation;

  generatedReducer[formattedConstant] = _reduceChildModules([... composes, reducer]);
  return generatedReducer;
};

export const createReducer = (initialState = Map(), transformations) => {
  const reducer = transformations.reduce(_generateReducer, {});
  return handleActions(reducer, initialState)
};

export default createReducer;
