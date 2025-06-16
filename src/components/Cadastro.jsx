import React, { useState } from 'react';
import styled from 'styled-components';

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
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 16px;
  border-radius: 6px;
`;

export function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.senha) {
      return alert('Preencha todos os campos');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const jaExiste = usuarios.some(u => u.email === form.email);

    if (jaExiste) {
      return alert('E-mail já cadastrado');
    }

    usuarios.push(form);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    setForm({ nome: '', email: '', senha: '' });
  };

  return (
    <Container>
      <Box>
        <Left>
          <Title>CADASTRO</Title>
          <Input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <Input
            placeholder="E-mail"
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
        </Left>
        <Right>
          <h1>Bem-vindo ao NextERP</h1>
          <p>Crie sua conta para acessar a plataforma</p>
        </Right>
      </Box>
    </Container>
  );
}
