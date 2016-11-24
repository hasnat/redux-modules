import { createModule } from 'redux-modules';
import { loop, liftState, Effects } from 'redux-loop';

const replaceAtIndex = (index, object, array) =>
  [].concat(
    array.slice(0, index),
    [object],
    array.slice(index + 1),
  );

const composeLoops = (...funcs) => funcs.reduce((acc, func) => {
  const [model, effect] = func();
  return [
    acc[0].concat([model]),
    acc[1].concat([effect]),
  ];
}, [[], []]);

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
      const [children, childrenEff] = composeLoops(
        () => module.reducer(state, module.actions.init()),
        () => module.reducer(undefined, module.actions.init()),
      );
      const effects = Effects.batch(
        childrenEff.map((effect, id) =>
          Effects.lift(effect, a => module.actions.updateChild(a, { id })),
        ),
      );
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
