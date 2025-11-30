import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffPage from './pages/StaffPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaffPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </Router>
  );
}

export default App;