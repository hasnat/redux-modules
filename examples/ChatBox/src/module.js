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
  transformations: {
    init: state => state,

    addChild: (state, { payload: direction }) => {
      const [newChild, neff] = module.reducer({ direction }, module.actions.init());
      return { ...state, children: [ ...state.children, newChild ]};
    },

    addLine: (state, { payload }) => ({
      ...state,
      lines: state.lines.concat(payload)
    }),

    split: (state, { payload: direction }) => {
      const [child1, neff1] = module.reducer(state, module.actions.init());
      const [child2, neff2] = module.reducer(undefined, module.actions.init());
      return { ...state, children: [ child1, child2 ] };
    },

    splitRequest: (state, { payload: direction }) => {
      return loop(state, Effects.constant(module.actions.split(direction)));
    },

    updateChild: ({children, ...state}, { payload, meta }) => {
      const childToUpdate = children[meta.id];
      const [updatedChild, neff] = module.reducer(childToUpdate, payload);

      let effects;
      const { action: neffAction } = neff.valueOf();

      if (neffAction && neffAction.type !== module.constants.splitRequest) {
        return {
          ...state,
          children: replaceAtIndex(meta.id, updatedChild, children)
        };
      }

      const direction = neffAction.payload.direction;
      if (direction === state.currentSplitDirection) {
        effects = Effects.constant(module.actions.addChild);
      } else {
        effects = Effects.lift(
          module.actions.split(direction),
          module.actions.updateChild
        );
      }

      return loop(
        { ...state, children: []},
        effects,
      );
    }
  },
});

export default module;
