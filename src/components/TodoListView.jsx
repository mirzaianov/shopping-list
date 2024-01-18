import PropTypes from 'prop-types';
import TodoView from './TodoView';

const style = {
  todos: `[&>*:last-child]:border-0 [&>*:last-child]:pb-0`,
};

const TodoListView = ({ todos, setTodo, setIsEdit, setTempUidd }) => {
  return (
    <ul className={style.todos}>
      {todos.map((item) => (
        <TodoView
          key={item.uidd}
          item={item}
          setTodo={setTodo}
          setIsEdit={setIsEdit}
          setTempUidd={setTempUidd}
        />
      ))}
    </ul>
  );
};

TodoListView.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodo: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  setTempUidd: PropTypes.func.isRequired,
};

export default TodoListView;
