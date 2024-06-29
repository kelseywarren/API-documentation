// Imports 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../logout/logout';

function Dashboard() {
  // Username state
  const [username, setUsername] = useState('');

  // Get username 
  useEffect(() => {
    async function getUsername() {
      try {
        const { data } = await axios.get('/dashboard', { withCredentials: true });
        setUsername(data.username);
      } catch (error) {
        console.error(error);
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
