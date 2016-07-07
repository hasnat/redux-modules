import { createModule } from '../../../src/index';

export default createModule({
  name: 'counter',
  initialState: 0,
  transformations: [
    {
      type: 'INCREMENT',
      reducer: state => state + 1,
    },
    {
      type: 'DECREMENT',
      reducer: state => state - 1,
    },
  ],
});
