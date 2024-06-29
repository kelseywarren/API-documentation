// Imports 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../logout/logout';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // Username state
  const [username, setUsername] = useState('');
  // Navigate (redirect)
  const navigate = useNavigate();

  // Check log in status 
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        // Request user session status from server 
        const response = await axios.get('/dashboard');
        // Check if user session exist 
        if (response.status !== 200) {
          // Go to login page if user session does not exist 
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    // Execute function 
    checkLoginStatus();
    // Check log in status upon navigation changes to ensure protected routes can't be accessed
  }, [navigate]);

  // Get username 
  useEffect(() => {
    async function getUsername() {
      try {
        // Request sent to user controller to get username from session data 
        const { data } = await axios.get('/dashboard', { withCredentials: true });
        // Set username state with username received from user session data in database 
        setUsername(data.username);
      } catch (error) {
        console.log(error);
      }
    };
    // Execute username function 
    getUsername();
  }, []);

  return (
    // username included in welcome message 
    <div>
      <p>Welcome, {username}!</p>
      <LogoutButton />
    </div>
  );
}

export default Dashboard;
