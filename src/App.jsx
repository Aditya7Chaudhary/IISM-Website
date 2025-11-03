import { useState } from 'react';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import './App.css'; // Make sure styles are imported

export default function App() {
  // This state controls which page is visible: 'home' or 'register'
  const [currentPage, setCurrentPage] = useState('home');

  // Function to pass to our pages to allow them to change the page
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Based on the currentPage, render the correct component
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

