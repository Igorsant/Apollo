import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';

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
import { isAuthenticated, getUserType } from './services/auth';
import { ReactElement } from 'react';

const isUserAuthenticated: boolean | undefined = isAuthenticated();
const userType: string = getUserType();

export const AppRouter = () => {
  function ProfessionalAuth({ children }: { children: ReactElement }) {
    if (!(isUserAuthenticated && userType === 'PROFESSIONAL')) {
      return <Navigate to="/" />;
    }
    return children;
  }
  function ClientAuth({ children }: { children: ReactElement }) {
    if (!(isUserAuthenticated && userType === 'CUSTOMER')) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cadastro"
          element={isUserAuthenticated ? <Navigate to="/" /> : <CadastroCliente />}
        />
        <Route path="/login" element={isUserAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/profissional/login" element={<LoginProfissional />} />
        <Route
          path="/profissional/cadastro"
          element={isUserAuthenticated ? <CadastroProfissional /> : <Navigate to="/" />}
        />
        <Route
          path="/profissional/perfil/:id"
          element={isUserAuthenticated ? <PerfilProfissional /> : <Navigate to="/" />}
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
