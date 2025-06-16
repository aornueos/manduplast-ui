import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  width: 900px;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  flex: 1;
  background: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  background-color: #00a859;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #00a859;
  color: white;
  padding: 12px;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Small = styled.p`
  margin-top: 12px;
  font-size: 14px;

  a {
    color: #00a859;
    text-decoration: none;
    font-weight: 600;
  }
`;

export function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha) {
      return toast.error('Preencha todos os campos');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error('Digite um e-mail válido');
    }

    if (form.senha.length < 4) {
      return toast.error('A senha deve ter pelo menos 4 caracteres');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const jaExiste = usuarios.some((u) => u.email === form.email);

    if (jaExiste) {
      return toast.error('E-mail já cadastrado');
    }

    usuarios.push(form);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    toast.success('Cadastro realizado com sucesso!');
    setForm({ nome: '', email: '', senha: '' });
    navigate('/login');
  };

  return (
    <Container>
      <Box>
        <Left>
          <Title>Cadastro</Title>
          <Input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />
          <Button onClick={handleSubmit}>Cadastrar</Button>
          <Small>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </Small>
        </Left>
        <Right>
          <h1>Bem-vindo ao NextERP</h1>
          <p>Crie sua conta para acessar a plataforma.</p>
        </Right>
      </Box>
    </Container>
  );
}
