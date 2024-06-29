// Imports 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../logout/logout';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // Username state
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await axios.get('/dashboard');
        if (response.status !== 200) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  // Get username 
  useEffect(() => {
    async function getUsername() {
      try {
        const { data } = await axios.get('/dashboard', { withCredentials: true });
        setUsername(data.username);
      } catch (error) {
        console.log(error);
      }
    };
    getUsername();
  }, []);

  return (
    <div>
      <p>Welcome, {username}!</p>
      <LogoutButton />
    </div>
  );
}

export default Dashboard;
