import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './components/Login';
import { OrderForm } from './components/OrderForm';
import { LandingPage } from './components/LandingPage';
import { Estoque } from './components/Estoque';
import { Cadastro } from './components/Cadastro';
import { Perfil } from './components/Perfil';
import { toast } from 'react-toastify';
import { User, LogOut, UserCircle2 } from 'lucide-react';
import { PageWrapper } from './components/PageWrapper';
import { PrivateRoute } from './components/PrivateRoute';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  gap: 20px;
  padding: 10px 20px;
  background: #00a859;
  color: white;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 6px;
  overflow: hidden;
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario) {
      setUsuarioLogado(usuario);
    }
    setLoading(false);
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
        <Link to="/">Início</Link>
        <Link to="/estoque">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
        {usuarioLogado ? (
          <Dropdown style={{ marginLeft: 'auto' }}>
            <span
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => setDropdownAberto(!dropdownAberto)}
            >
              <UserCircle2 size={20} /> {usuarioLogado.nome}
            </span>
            <DropdownContent $show={dropdownAberto}>
              <DropdownItem onClick={() => navigate('/perfil')}>
                <User size={16} /> Ver Perfil
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <LogOut size={16} /> Sair
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </div>
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
            <PrivateRoute usuarioLogado={usuarioLogado} loading={loading}>
              <PageWrapper>
                <Estoque />
              </PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute usuarioLogado={usuarioLogado} loading={loading}>
              <PageWrapper>
                <OrderForm />
              </PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute usuarioLogado={usuarioLogado} loading={loading}>
              <PageWrapper>
                <Perfil />
              </PageWrapper>
            </PrivateRoute>
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
