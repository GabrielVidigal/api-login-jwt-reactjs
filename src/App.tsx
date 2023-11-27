import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserForm from './pages/UserForm';
import MePage from './pages/MePage';
import UpdateUserPage from './pages/UpdateUserPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/update/:userId" element={<UpdateUserPage />} />
      </Routes>
    </Router>
  );
};

export default App;