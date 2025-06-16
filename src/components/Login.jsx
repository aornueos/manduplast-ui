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

export function Login({ setUsuarioLogado }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !senha) {
      return toast.error('Preencha todos os campos');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      setUsuarioLogado(usuario);
      toast.success('Login realizado com sucesso!');
      navigate('/estoque');
    } else {
      toast.error('E-mail ou senha inválidos');
    }
  };

  return (
    <Container>
      <Box>
        <Left>
          <Title>Login</Title>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button onClick={handleLogin}>Entrar</Button>
          <Small>
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </Small>
        </Left>
        <Right>
          <h1>Bem-vindo de volta</h1>
          <p>Faça login para acessar sua conta no Next ERP.</p>
        </Right>
      </Box>
    </Container>
  );
}
