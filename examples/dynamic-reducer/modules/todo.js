import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';

import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import getLocation from '../services/geolocation';

const get = (attr, def) => obj => obj.get(attr, def);

const { shape, number, string, bool } = PropTypes;

function* updateLocations(actions) {
  try {
    const loc = yield getLocation();
    yield actions.update({loc});
  }
}

function* persist(actions) {
  try {
    const locations = yield select(state => state.locations);
    yield storage.set('levi_locations', JSON.stringify(locations.toJS()));
  } catch (e) {
    console.log('Persist!', e);
  }
}

const executeReducers = (state, action) => {
  return module.childReducers.reduce((state, module) => {
    // IT 0: state = {}
    // IT 1: state = {name}
    // IT 2: state = {name, location}
    return module.reducer(state.getIn(module.path), action);
  }, Map());
}

export default createModule({
  name: 'root',
  initialState: Map(),
  transformations: [
    {
      action: 'CREATE',
      childReducers: [ { reducer: todoReducer, path: payload => get(payload.id) }, { reducer: locationReducer, path: 'location' } ],
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      //ROOT#CREATE
      reducer: (state, action) => {
        return state.merge(action.payload.id, action.payload); // Map({name, location: { lat, lng }})
      },
      // TODO#CREATE { name, location }
      childReducers: [ locationReducer ], // Gets called w/ TodoInitialState
      reducer: (state, action) => {
        return state.update(
          // Result of Location Reducer ({name, location: { lat }})
          todo => todo.set('name', action.payload.name)
        );
      },
      // LOCATION#CREATE
      reducer: (state, action) => {
        return state.update(
          location => location.set('lat', action.payload.lat) // Map({location: { lat })
        );
      },

      *sideEffects({ payload }) {
        return [
          [ updateLocation ],
          [ persist ]
        ],
      }
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        return state.delete(index);
      },
    },
    {
      action: 'UPDATE',
      payloadTypes: {
        index: number.isRequired,
        todo: shape({
          description: string,
          checked: bool,
        }),
      },
      reducer: (state, {payload: { index, todo: updates }}) => {
        // state.todos
        // state.todos[payload.id]
        return state.update(
          index,
          todo => todo.merge(fromJS(updates))
        );
      },
    },
  ],
});
