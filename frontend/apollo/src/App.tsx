import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CadastroCliente from "./pages/CadastroCliente/CadastroCliente";
import CadastroProfissional from "./pages/CadastroProfissional/CadastroProfissional";
import Login from "./pages/Login/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrocliente" element={<CadastroCliente />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cadastroprofissional"
          element={<CadastroProfissional />}
        />
      </Routes>
    </BrowserRouter>
  );
};
