// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user authentication, remove tokens, etc.
    // After logout, navigate to the login page or any other desired page.
    // For now, let's navigate to the login page ("/login").
    navigate('/');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
      }}
    >
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
