import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  background-color: #00a859;
  color: white;
  padding: 60px 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  margin-bottom: 20px;
`;

const HeroButton = styled.button`
  padding: 10px 20px;
  background-color: #f7b500;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Section = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Features = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  width: 280px;
  min-height: 150px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormSection = styled.div`
  background: #f5f5f5;
  padding: 40px 20px;
  border-radius: 12px;
  max-width: 400px;
  margin: 30px auto 60px;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 50%;
  padding: 12px;
  background-color: #f7b500;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

export function LandingPage() {
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
      <Hero>
        <HeroTitle>Transforme sua gestão com o Next ERP</HeroTitle>
        <HeroSubtitle>Gerencie sua empresa de forma simples e eficiente. O futuro da gestão está aqui!</HeroSubtitle>
        <HeroButton>Comece Agora</HeroButton>
      </Hero>

      <Section>
        <Title>Funcionalidades Principais</Title>
        <Features>
          <Feature>
            <h3>Gestão de Pedidos</h3>
            <p>Controle de pedidos e entregas em tempo real</p>
          </Feature>
          <Feature>
            <h3>Estoque Inteligente</h3>
            <p>Atualização automática e controle de estoque</p>
          </Feature>
          <Feature>
            <h3>Relatórios Personalizados</h3>
            <p>Indicadores e relatórios gerenciais</p>
          </Feature>
        </Features>
      </Section>

      <FormSection>
        <h3>Cadastre-se e Comece Agora</h3>
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
      </FormSection>
    </Container>
  );
}
