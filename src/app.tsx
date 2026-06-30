import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.css';
import './globals.css';

const Homepage = lazy(() => import('./pages/homepage'));
const Welcome = lazy(() => import('./pages/welcome'));

export default function App() {
  return (
    <Router>
      <div className={styles.page}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
