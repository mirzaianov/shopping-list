import Todo from './Todo';

function Firestore({ todos }) {
  return (
    <div>
      {todos.map((item) => (
        <Todo
          key={item.uidd}
          todo={item.todo}
        />
      ))}
    </div>
  );
}

export default Firestore;
