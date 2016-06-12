import { createModule } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';
import { v4 } from 'uuid';

const { shape, number, string, bool } = PropTypes;

export default createModule({
  name: 'location',
  initialState: fromJS({ lat: null, lng: null}),
  transformations: [],
});
