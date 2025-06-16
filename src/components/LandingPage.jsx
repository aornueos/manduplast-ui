import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
`;

const Hero = styled.div`
  background-color: #00a859;
  color: white;
  padding: 80px 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 12px;
`;

const HeroSubtitle = styled.p`
  margin-bottom: 24px;
  font-size: 18px;
`;

const HeroButton = styled.button`
  padding: 12px 24px;
  background-color: #f7b500;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Section = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 28px;
`;

const Features = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Feature = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 280px;
  transition: 0.3s;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  }

  h3 {
    margin-bottom: 10px;
    color: #00a859;
  }

  p {
    color: #555;
    font-size: 15px;
  }
`;

const FormSection = styled.div`
  background: #f5f5f5;
  padding: 50px 40px;
  border-radius: 12px;
  max-width: 400px;
  margin: 0 auto 80px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f7b500;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export function LandingPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.senha) {
      return alert('Preencha todos os campos');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const jaExiste = usuarios.some((u) => u.email === form.email);

    if (jaExiste) {
      return alert('E-mail já cadastrado');
    }

    usuarios.push(form);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    setForm({ nome: '', email: '', senha: '' });
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Hero>
        <HeroTitle>Transforme sua gestão com o Next ERP</HeroTitle>
        <HeroSubtitle>
          Gerencie sua empresa de forma simples e eficiente. O futuro da gestão está aqui!
        </HeroSubtitle>
        <HeroButton onClick={scrollToForm}>Comece Agora</HeroButton>
      </Hero>

      <Section>
        <Title>Funcionalidades Principais</Title>
        <Features>
          <Feature>
            <h3>Gestão de Pedidos</h3>
            <p>Controle de pedidos e entregas em tempo real, de forma prática e intuitiva.</p>
          </Feature>
          <Feature>
            <h3>Estoque Inteligente</h3>
            <p>Atualização automática e controle total sobre seu estoque e inventário.</p>
          </Feature>
          <Feature>
            <h3>Relatórios Personalizados</h3>
            <p>Indicadores e relatórios gerenciais claros para tomadas de decisão.</p>
          </Feature>
        </Features>
      </Section>

      <FormSection ref={formRef}>
        <h3>Cadastre-se e Comece Agora</h3>
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
      </FormSection>
    </Container>
  );
}
