import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const Homepage = lazy(() => import('./pages/Homepage'));
const Welcome = lazy(() => import('./pages/Welcome'));

const style = {
  bg: `min-h-screen p-4 bg-base-100`,
};

export default function App() {
  return (
    <Router>
      <div className={style.bg}>
        <Suspense fallback={null}>
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
        </Suspense>
      </div>
    </Router>
  );
}
