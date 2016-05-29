import todoModule from './todoModule';
import counterModule from './counterModule';
import { connectModule } from '../../src/index';
import TodoList from './TodoList';

const mapState = state => {
  return {
    todos: { collection: [... state.todos.toJS()] },
  }
};

export default connectModule(
  mapState,
  [ todoModule, counterModule ],
  TodoList
);
