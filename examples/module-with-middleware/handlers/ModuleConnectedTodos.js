import todoModule from '../modules/todo';
import { connectModule } from '../../../src/index';
import TodoList from '../components/TodoList';

const Connected = connectModule(
  todoModule,
)(TodoList);

export default Connected;
