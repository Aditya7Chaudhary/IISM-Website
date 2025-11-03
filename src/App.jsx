import { useState } from 'react';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-wrapper">
      {currentPage === 'home' && (
        <HomePage onNavigateToRegister={() => navigateTo('register')} />
      )}
      {currentPage === 'register' && (
        <RegistrationPage onNavigateHome={() => navigateTo('home')} />
      )}
    </div>
  );
}

