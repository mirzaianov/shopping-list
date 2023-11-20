import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '/firebase';
import { useEffect } from 'react';

export default function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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

  return (
    <div className="homepage">
      <h1>test</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
