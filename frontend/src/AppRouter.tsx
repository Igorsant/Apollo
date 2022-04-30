import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
import CadastroProfissional from './pages/CadastroProfissional/CadastroProfissional';
import PerfilProfissional from './pages/PerfilProfissional/PerfilProfissional';
import Login from './pages/Login/Login';
import LoginProfissional from './pages/LoginProfissional/Loginprofissional';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrocliente" element={<CadastroCliente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginprofissional" element={<LoginProfissional />}></Route>
        <Route path="/cadastroprofissional" element={<CadastroProfissional />} />
        <Route path="/perfilProfissional/:id" element={<PerfilProfissional />} />
      </Routes>
    </BrowserRouter>
  );
};
