import todoModule from '../modules/todo';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';

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
