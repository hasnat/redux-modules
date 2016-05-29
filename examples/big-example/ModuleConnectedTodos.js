import todoModule from './todoModule';
import counterModule from './counterModule';
import { connectModule } from '../../src/index';
import TodoList from './TodoList';

const mapState = state => {
  return {
    todos: { collection: [... state.todos.toJS()] },
  }
};

const Connected = connectModule(
  mapState,
  todoModule,
  TodoList
);

export default Connected;
