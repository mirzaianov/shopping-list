import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
};

export default function App() {
  return (
    <div className={style.bg}>
      <Router>
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
      </Router>
    </div>
  );
}
