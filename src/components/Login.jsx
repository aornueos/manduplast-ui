import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  flex: 1;
  padding: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  background-color: #00a859;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: #00a859;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  width: 50%;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Login({ setUsuarioLogado }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      setUsuarioLogado(usuario);
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } else {
      toast.error('E-mail ou senha inválidos');
    }
  };

  return (
    <Container>
      <Box>
        <Left>
          <Title>LOGIN</Title>
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
        </Left>
        <Right>
          <h1>Bem-vindo de volta</h1>
          <p>Entre com sua conta para acessar a plataforma</p>
        </Right>
      </Box>
    </Container>
  );
}
