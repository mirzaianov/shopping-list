import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';

const style = {
  bg: `min-h-screen p-4 bg-gradient-to-br from-[oklch(var(--p))] to-[oklch(var(--in))]`,
};

export default function App() {
  return (
    <Router>
      <div className={style.bg}>
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
          <Route
            path="/homepage"
            element={<Homepage />}
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="/"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
