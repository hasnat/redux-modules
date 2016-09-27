import { createModule } from '../../../src/index';

export default createModule({
  name: 'counter',
  initialState: 0,
  transformations: [
    {
      type: 'increment',
      reducer: state => state + 1,
    },
    {
      type: 'decrement',
      reducer: state => state - 1,
    },
  ],
});
