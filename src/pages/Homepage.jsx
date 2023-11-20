import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '/firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';

export default function Homepage() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);

          const data = snapshot.val();

          if (data !== null) {
            Object.values(data).map((item) => {
              setTodos((oldArray) => [...oldArray, item]);
            });
          }
        });
      }
      if (!user) {
        navigate('/');
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), { todo, uidd });
    setTodo('');
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), { todo, tempUidd });
    setTodo('');
  };

  // delete

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="homepage">
      <input
        type="text"
        placeholder="Add Todo..."
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      {todos.map((item) => (
        <div key={item.uidd}>
          <h1>{item.todo}</h1>
          <button onClick={() => handleUpdate(item)}>update</button>
          <button onClick={() => handleDelete(item.uidd)}>delete</button>
        </div>
      ))}
      {isEdit ? (
        <div>
          <button onClick={handleEditConfirm}>Confirm</button>
        </div>
      ) : (
        <div>
          <button onClick={writeToDatabase}>Add</button>
        </div>
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
