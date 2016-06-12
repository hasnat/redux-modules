import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';

import locationModule from './location';
const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'todo',
  initialState: fromJS({ name: '', location: {}}),
  transformations: [
    {
      action: 'SET_NAME',
      payloadTypes: string,
      reducer: (state, {payload}) => {
        return state.set('name', payload);
      },
    },
  ],
});
