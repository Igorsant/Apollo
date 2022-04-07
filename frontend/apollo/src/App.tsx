import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


import Home from './pages/Home/Home'
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
import Login from './pages/Login/Login';
import { Button } from '@mui/material';

export const App = () => {
 return(      
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />]
      <Route path="/cadastrocliente" element={<CadastroCliente />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>)
}