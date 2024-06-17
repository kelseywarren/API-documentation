import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login/login';
import Home from './pages/home/home'

function App() {


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login />} />
  </Route>
));

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
