import { createModule } from 'redux-modules';

export default createModule({
  initialState: 0,
  selector: state => ({ count: state }),
  transformations: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});
