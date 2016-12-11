import { createModule } from 'redux-modules';
import { loop, Effects, liftState } from 'redux-loop';

const replaceAtIndex = (index, object, array) =>
  [].concat(
    array.slice(0, index),
    [object],
    array.slice(index+1),
  );

const module = createModule({
  name: 'chatBox',
  initialState: {
    name: '',
    lines: [],
    children: [],
    currentSplitDirection: null,
  },
  selector: state => state.chatBox,
  composes: [ liftState ],
  middleware: [ a => { console.log(a); return a }],
  transformations: {
    init: state => state,

    addChild: state => {
      const [newChild, neff] = module.reducer(undefined, module.actions.init());
      return { ...state, children: [ ...state.children, newChild ]};
    },

    addLine: (state, { payload }) => ({
      ...state,
      lines: state.lines.concat(payload)
    }),

    split: (state, { payload: direction }) => {
      const [child1, neff1] = module.reducer(state, module.actions.init());
      const [child2, neff2] = module.reducer(undefined, module.actions.init());
      return {
        ...state,
        currentSplitDirection: direction,
        children: [ child1, child2 ],
      };
    },

    splitRequest: (state, { payload: direction }) => {
      if (direction !== state.currentSplitDirection) {
        return loop(state, Effects.constant(module.actions.split(direction)));
      }
      return loop(state, Effects.constant(module.actions.addChild()));
    },

    updateChild: ({children, ...state}, { payload, meta }) => {
      const childToUpdate = children[meta.id];
      const [updatedChild, neff] = module.reducer(childToUpdate, payload);
      const effects = Effects.lift(
        neff,
        a => module.actions.updateChild(a, { id: meta.id })
      );

      return loop(
        { ...state, children: replaceAtIndex(meta.id, updatedChild, children)},
        effects,
      );
    }
  },
});

export default module;
