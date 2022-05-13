import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroCliente from './pages/Cadastro/CadastroCliente';
import CadastroProfissional from './pages/Cadastro/CadastroProfissional';
import PerfilProfissional from './pages/PerfilProfissional';
import Login from './pages/Login/LoginClient';
import LoginProfissional from './pages/Login/LoginProfissional';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro/cliente" element={<CadastroCliente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/profissional" element={<LoginProfissional />} />
        <Route path="/cadastro/profissional" element={<CadastroProfissional />} />
        <Route path="/perfil/profissional/:id" element={<PerfilProfissional />} />
      </Routes>
    </BrowserRouter>
  );
};
