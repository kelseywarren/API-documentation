// Imports
import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login/login';
import LogoutButton from './pages/logout/logout';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import Navbar from './components/navbar/navbar';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

// Set axios defaults 
axios.defaults.baseURL = 'http://localhost:5500';
axios.defaults.withCredentials = true; 

// Main component 
function App() {

// Router
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login/>} />
    <Route path="register" element={ <Register/>} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="logout" element={<LogoutButton />} />
  </Route>
));

  return (
    <div>
      <Toaster />
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
