import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-br from-[oklch(var(--p))] to-[oklch(var(--in))]`,
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
        </Routes>
      </div>
    </Router>
  );
}
