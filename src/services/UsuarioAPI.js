import api from './api';

export const UsuarioAPI = {
  // 🔸 Cadastro de usuário
  async cadastrar(dados) {
    const response = await api.post('/usuarios/cadastro', dados);
    return response.data;
  },

  // 🔸 Login com armazenamento de token e dados do usuário
  async login(email, senha) {
    const response = await api.post('/usuarios/login', {
      email,
      senha,
    });

    const token = response.data.token;
    const usuario = response.data.usuario;

    if (token && usuario) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      return usuario;
    } else {
      throw new Error('Falha ao realizar login');
    }
  },

  // 🔸 Buscar usuário por ID
  async buscarPorId(id) {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },
};
