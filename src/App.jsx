import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';

import './App.scss';

export default function App() {
  return (
    <div className="app">
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
