import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './components/Login.jsx';
import { OrderForm } from './components/OrderForm.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { Estoque } from './components/Estoque.jsx';
import { Cadastro } from './components/Cadastro.jsx';
import { Perfil } from './components/Perfil.jsx';
import { toast } from 'react-toastify';
import { User, LogOut, UserCircle2 } from 'lucide-react';
import { PageWrapper } from './components/PageWrapper.jsx';

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 10px 20px;
  background: #00a859;
  color: white;
  align-items: center;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 6px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-in-out;
`;

const DropdownItem = styled.button`
  padding: 12px 16px;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario) setUsuarioLogado(usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuarioLogado(null);
    toast.info('Você saiu da conta.');
    navigate('/login');
  };

  return (
    <>
      <Nav>
        <Link to="/" style={{ color: 'white' }}>
          Início
        </Link>
        <Link to="/estoque" style={{ color: 'white' }}>
          Produtos
        </Link>
        <Link to="/pedidos" style={{ color: 'white' }}>
          Pedidos
        </Link>
        {usuarioLogado ? (
          <Dropdown style={{ marginLeft: 'auto' }}>
            <span
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => setDropdownAberto(!dropdownAberto)}
            >
              <UserCircle2 size={20} /> {usuarioLogado.nome}
            </span>
            <DropdownContent show={dropdownAberto}>
              <DropdownItem onClick={() => navigate('/perfil')}>
                <User size={16} /> Ver Perfil
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <LogOut size={16} /> Sair
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginLeft: 'auto' }}>
              Login
            </Link>
            <Link to="/cadastro" style={{ color: 'white' }}>
              Cadastro
            </Link>
          </>
        )}
      </Nav>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <LandingPage />
            </PageWrapper>
          }
        />
        <Route
          path="/estoque"
          element={
            <ProtectedRoute usuarioLogado={usuarioLogado}>
              <PageWrapper>
                <Estoque />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute usuarioLogado={usuarioLogado}>
              <PageWrapper>
                <OrderForm />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute usuarioLogado={usuarioLogado}>
              <PageWrapper>
                <Perfil />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login setUsuarioLogado={setUsuarioLogado} />
            </PageWrapper>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PageWrapper>
              <Cadastro />
            </PageWrapper>
          }
        />
      </Routes>
    </>
  );
}

function ProtectedRoute({ usuarioLogado, children }) {
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
