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
      action: 'INIT',
      composes: [
        {
          reducer: locationModule.reducer,
          path: [ 'location' ],
          action: locationModule.actions.init(),
        }
      ],
      reducer: state => state,
    },
    {
      action: 'SET_NAME',
      payloadTypes: {
        index: number.isRequired,
        todo: shape({
          description: string,
          checked: bool,
        }),
      },
      reducer: (state, {payload: { index, todo: updates }}) => {
        return state.update(
          index,
          todo => todo.merge(fromJS(updates))
        );
      },
    },
  ],
});
