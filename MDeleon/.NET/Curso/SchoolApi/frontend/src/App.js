import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddStudent from './components/AddStudent';
import AddProfessor from './components/AddProfessor';
import AddCourse from './components/AddCourse';
import ManageEntities from './components/ManageEntities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Página de inicio */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-professor" element={<AddProfessor />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/manage-entities" element={<ManageEntities />} />
      </Routes>
    </Router>
  );
}

export default App;