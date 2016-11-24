import { createModule } from 'redux-modules';
import { loop, Effects, liftState } from 'redux-loop';
import { module as PokemonModule } from '../../PokemonMe/src';

const replaceAtIndex = (index, object, array) =>
  [].concat(
    array.slice(0, index),
    [object],
    array.slice(index + 1),
  );

const module = createModule({
  name: 'uberBox',
  initialState: {
    name: '',
    lines: [],
    childBoxes: [],
    widget: 'default',
    widgetState: {},
    currentSplitDirection: null,
  },
  selector: state => state.uberBox,
  composes: [liftState],
  middleware: [ a => { console.log(a); return a; }],
  transformations: {
    init: state => state,

    addChild: (state) => {
      const [newChild] = module.reducer(undefined, module.actions.init());
      return { ...state, childBoxes: [...state.childBoxes, newChild]};
    },

    addLine: (state, { payload }) => ({
      ...state,
      lines: state.lines.concat(payload),
    }),

    split: (state, { payload: direction }) => {
      const [child1] = module.reducer(state, module.actions.init());
      const [child2] = module.reducer(undefined, module.actions.init());
      return {
        ...state,
        currentSplitDirection: direction,
        childBoxes: [child1, child2],
      };
    },

    splitRequest: (state, { payload: direction }) => {
      if (direction !== state.currentSplitDirection) {
        return loop(state, Effects.constant(module.actions.split(direction)));
      }
      return loop(state, Effects.constant(module.actions.addChild()));
    },

    updateChild: ({childBoxes, ...state}, { payload, meta }) => {
      const childToUpdate = childBoxes[meta.id];
      const [updatedChild, neff] = module.reducer(childToUpdate, payload);
      const effects = Effects.lift(
        neff,
        a => module.actions.updateChild(a, { id: meta.id }),
      );

      return loop(
        {
          ...state,
          childBoxes: replaceAtIndex(meta.id, updatedChild, childBoxes)
        },
        effects,
      );
    }
  },
});

export default module;
