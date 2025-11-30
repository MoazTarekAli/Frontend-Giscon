import { Routes, Route } from 'react-router-dom';
import StaffPage from './pages/StaffPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/staff" element={<StaffPage />} />
    </Routes>
  );
}

export default App;