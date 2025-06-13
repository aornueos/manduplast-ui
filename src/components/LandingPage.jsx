import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: sans-serif;
`;

const Header = styled.div`
  background-color: #00a859;
  padding: 40px 20px;
  text-align: center;
  color: white;
`;

const Button = styled.button`
  background: #ffb400;
  color: #000;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

const Features = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  gap: 40px;
  background: #f8f8f8;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

const FormSection = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  width: 300px;
  margin: 10px auto;
  padding: 10px;
`;

export function LandingPage() {
  return (
    <Wrapper>
      <Header>
        <h1>Transforme sua gestão com o Next ERP</h1>
        <p>Gerencie sua empresa de forma simples e eficiente. O futuro da gestão está aqui!</p>
        <Button>Comece Agora</Button>
      </Header>

      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Funcionalidades Principais</h2>
      <Features>
        <Card>
          <h3>Gestão de Pedidos</h3>
          <p>Controle de pedidos e entregas em tempo real</p>
        </Card>
        <Card>
          <h3>Estoque Inteligente</h3>
          <p>Atualização automática e controle de estoque</p>
        </Card>
        <Card>
          <h3>Relatórios Personalizados</h3>
          <p>Indicadores e relatórios gerenciais</p>
        </Card>
      </Features>

      <FormSection>
        <h3>Cadastre-se e Comece Agora</h3>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" type="password" />
        <Button>Cadastrar</Button>
      </FormSection>

      <div style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
        © 2025 ERP Digital. Todos os direitos reservados.
      </div>
    </Wrapper>
  );
}