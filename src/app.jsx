import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './components/Login.jsx';
import { OrderForm } from './components/OrderForm.jsx';
import { PaymentForm } from './components/PaymentForm.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { Estoque } from './components/Estoque.jsx';
import { Cadastro } from './components/Cadastro.jsx';

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 10px 20px;
  background: #00a859;
  color: white;
`;

export default function App() {
  return (
    <>
      <Nav>
        <Link to="/" style={{ color: 'white' }}>Início</Link>
        <Link to="/estoque" style={{ color: 'white' }}>Produtos</Link>
        <Link to="/pedidos" style={{ color: 'white' }}>Pedidos</Link>
        <Link to="/pagamento" style={{ color: 'white' }}>Pagamento</Link>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/cadastro" style={{ color: 'white' }}>Cadastro</Link>
      </Nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/pedidos" element={<OrderForm />} />
        <Route path="/pagamento" element={<PaymentForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </>
  );
}