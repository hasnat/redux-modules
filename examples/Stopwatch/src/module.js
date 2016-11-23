import { createModule } from 'redux-modules';
import { loop, Effects, liftState } from 'redux-loop';

const module = createModule({
  name: 'stopwatch',
  initialState: {
    running: false,
    time: 0,
  },
  selector: state => state.stopwatch,
  composes: [liftState],
  middleware: [a => { console.log(a); return a; }],
  transformations: {
    init: state => state,
    start: state => ({ ...state, running: true, time: state.time + 1 }),
    stop: state => ({ ...state, running: false }),
    setTime: (state, { payload: time }) => ({ ...state, time }),
    reset: state => ({ ...state, time: 0 }),
  },
});

export default module;
