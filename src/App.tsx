import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffPage from './pages/StaffPage';
import SkillsPage from './pages/SkillsPage';
import TechnologyPage from './pages/TechnologyPage';
import ProjectsPage from './pages/ProjectsPage';
import CVPage from './pages/CVPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaffPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </Router>
  );
}

export default App;
