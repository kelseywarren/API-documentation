import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/login/login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/login" element={ <Login/> }>

  </Route>
));
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
