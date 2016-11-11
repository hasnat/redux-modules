import { createModule } from '../../../src/index';

export default createModule({
  name: 'counter',
  initialState: 0,
  transformations: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});
