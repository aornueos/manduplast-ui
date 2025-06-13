import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserCircle2 } from 'lucide-react';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const Avatar = styled.div`
  margin-bottom: 20px;
  color: #00a859;
`;

const Info = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

export function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('usuarioLogado'));
    setUsuario(dados);
  }, []);

  if (!usuario) return null;

  return (
    <Container>
      <Avatar>
        <UserCircle2 size={64} />
      </Avatar>
      <h2>Perfil do Usuário</h2>
      <Info><strong>Nome:</strong> {usuario.nome}</Info>
      <Info><strong>Email:</strong> {usuario.email}</Info>
    </Container>
  );
}
