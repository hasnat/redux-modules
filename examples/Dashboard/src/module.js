import { createModule } from 'redux-modules';
import { loop, liftState, Effects } from 'redux-loop';

const replaceAtIndex = (index, object, array) =>
  [].concat(
    array.slice(0, index),
    [object],
    array.slice(index + 1),
  );

debugger;
const module = createModule({
  name: 'dashboard',
  initialState: {
    name: '',
    content: [],
    children: [],
    orientation: null,
  },
  selector: state => state.dashboard,
  composes: [liftState],
  middleware: [(a) => { console.log(a); return a; }],
  transformations: {
    init: state => state,
    addChild: (state) => {
      const [newChild, neff] = module.reducer(undefined, module.actions.init());
      return loop(
        { ...state, children: [...state.children, newChild] },
        neff,
      );
    },
    setContent: state => state,
    split: (state, { payload: orientation }) => {
      const [child1, neff1] = module.reducer(state, module.actions.init());
      const [child2, neff2] = module.reducer(undefined, module.actions.init());
      const children = [child1, child2];
      const effects = Effects.batch([
        Effects.lift(neff1, a => module.actions.updateChild(a, { id: 0 })),
        Effects.lift(neff2, a => module.actions.updateChild(a, { id: 1 })),
      ]);
      return loop(
        { ...state, orientation, children },
        effects,
      );
    },
    splitRequest: (state, { payload: orientation }) => {
      const effect = orientation !== state.orientation
        ? Effects.constant(module.actions.split(orientation))
        : Effects.constant(module.actions.addChild());
      return loop(state, effect);
    },
    updateChild: ({ children, ...state }, { payload, meta }) => {
      const childToUpdate = children[meta.id];
      const [updatedChild, neff] = module.reducer(childToUpdate, payload);
      const effects =
        Effects.lift(neff, a => module.actions.updateChild(a, { id: meta.id }));

      return loop(
        { ...state, children: replaceAtIndex(meta.id, updatedChild, children) },
        effects,
      );
    },
  },
});

export default module;
