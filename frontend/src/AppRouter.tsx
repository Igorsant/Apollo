import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import CadastroCliente from './pages/Cadastro/CadastroCliente';
import CadastroProfissional from './pages/Cadastro/CadastroProfissional';
import PerfilProfissional from './pages/PerfilProfissional';
import Login from './pages/Login/LoginClient';
import LoginProfissional from './pages/Login/LoginProfissional';
import BuscarProfissionais from './pages/BuscaProfissionais';
import { Dashboard } from './pages/Dashboard/DashboardCliente/Dashboard';
import { DashboardProfissional } from './pages/Dashboard/DashboardProfissional/DashboardProfissional';
import { Header } from './components/Header/Header';
import { ClientAuth } from './components/AuthCheck/ClientAuth';
import { ProfessionalAuth } from './components/AuthCheck/ProfissionalAuth';
import { LoggedIn } from './components/AuthCheck/LoggedIn';

export const AppRouter = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cadastro"
          element={
            <LoggedIn>
              <CadastroCliente />
            </LoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <LoggedIn>
              <Login />
            </LoggedIn>
          }
        />
        <Route
          path="/profissional/login"
          element={
            <LoggedIn>
              <LoginProfissional />
            </LoggedIn>
          }
        />
        <Route
          path="/profissional/cadastro"
          element={
            <LoggedIn>
              <CadastroProfissional />
            </LoggedIn>
          }
        />
        <Route
          path="/profissional/perfil/:id"
          element={
            <ClientAuth>
              <PerfilProfissional />
            </ClientAuth>
          }
        />
        <Route path="/buscar" element={<BuscarProfissionais />} />
        <Route
          path="/dashboard/cliente"
          element={
            <ClientAuth>
              <Dashboard />
            </ClientAuth>
          }
        />
        <Route
          path="/dashboard/profissional"
          element={
            <ProfessionalAuth>
              <DashboardProfissional />
            </ProfessionalAuth>
          }
        />
        <Route
          path="*"
          element={<h1 style={{ color: 'black ' }}>Desculpe, essa página não existe</h1>}
        />
      </Routes>
    </Router>
  );
};
