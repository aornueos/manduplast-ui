import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const LoginBox = styled.div`
  display: flex;
  width: 900px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
`;

const Left = styled.div`
  flex: 1;
  padding: 40px;
`;

const Right = styled.div`
  flex: 1;
  background-color: #00a859;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #00a859;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
`;

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.find(u => u.email === email && u.senha === senha);
    if (existe) {
      alert(`Bem-vindo(a), ${existe.nome}!`);
      window.location.href = '/';
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Left>
          <Title>LOGIN</Title>
          <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </Left>
        <Right>
          <h1>Bem-vindo de volta</h1>
          <p>Faça seu login novamente</p>
          <Button onClick={handleLogin}>Login</Button>
        </Right>
      </LoginBox>
    </Container>
  );
}
