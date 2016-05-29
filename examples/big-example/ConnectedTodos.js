import { connect } from 'react-redux';
import todoModule from './todoModule';
import TodoList from './TodoList';

const { actions } = todoModule;

const mapState = state => {
  return {
    todos: [... state.todos.toJS()],
  }
};

const mapDispatch = dispatch => {
  return {
    create: ({todo}) =>
      dispatch(actions.create({todo})),
    destroy: ({index}) =>
      dispatch(actions.destroy({index})),
    update: ({index, todo}) =>
      dispatch(actions.update({index, todo})),
  };
};

const namespaceProps = (state, actions, props) => {
  return { ... props, todos: { actions, ... state } };
};

export default connect(
  mapState,
  mapDispatch,
  namespaceProps
)(TodoList);
