import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserCircle2 } from 'lucide-react';

const Container = styled.div`
  max-width: 600px;
  margin: 80px auto 20px;
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.div`
  margin-bottom: 20px;
  color: #00a859;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ danger }) => (danger ? '#dc3545' : '#00a859')};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin: 5px;

  &:hover {
    opacity: 0.9;
  }
`;

export function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    avatar: '',
    senha: '',
    novaSenha: '',
  });

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (dados) {
      setUsuario(dados);
      setForm({
        nome: dados.nome,
        email: dados.email,
        avatar: dados.avatar || '',
        senha: '',
        novaSenha: '',
      });
    }
  }, []);

  const handleSalvar = () => {
    if (!form.nome || !form.email) {
      alert('Preencha nome e e-mail');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex((u) => u.email === usuario.email);

    if (index !== -1) {
      // Verificar senha para alterar
      if (form.senha && form.novaSenha) {
        if (usuarios[index].senha !== form.senha) {
          alert('Senha atual incorreta');
          return;
        }
        usuarios[index].senha = form.novaSenha;
      }

      usuarios[index] = {
        ...usuarios[index],
        nome: form.nome,
        email: form.email,
        avatar: form.avatar,
      };

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify({
          nome: form.nome,
          email: form.email,
          avatar: form.avatar,
        })
      );

      setUsuario({
        nome: form.nome,
        email: form.email,
        avatar: form.avatar,
      });
      setEditando(false);
      alert('Dados atualizados com sucesso!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/login';
  };

  if (!usuario) return null;

  return (
    <Container>
      <Avatar>
        {usuario.avatar ? (
          <img src={usuario.avatar} alt="Avatar" />
        ) : (
          <UserCircle2 size={64} />
        )}
      </Avatar>

      <h2>Perfil do Usuário</h2>

      {editando ? (
        <>
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
            placeholder="URL do Avatar (opcional)"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
          <hr style={{ margin: '15px 0' }} />
          <h4>Alterar senha (opcional)</h4>
          <Input
            type="password"
            placeholder="Senha atual"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Nova senha"
            value={form.novaSenha}
            onChange={(e) => setForm({ ...form, novaSenha: e.target.value })}
          />
          <div>
            <Button onClick={handleSalvar}>Salvar</Button>
            <Button danger onClick={() => setEditando(false)}>
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <>
          <Info>
            <strong>Nome:</strong> {usuario.nome}
          </Info>
          <Info>
            <strong>Email:</strong> {usuario.email}
          </Info>
          <div style={{ marginTop: '20px' }}>
            <Button onClick={() => setEditando(true)}>Editar Perfil</Button>
            <Button danger onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
