import api from './api';

export const UsuarioAPI = {
  async cadastrar(dados) {
    const response = await api.post('/usuarios/cadastro', dados);
    return response.data;
  },

  async login(email, senha) {
    const response = await api.post('/usuarios/login', {
      email: email,
      senha: senha,
    });

    const usuario = {
      nome: response.data.nome,
      email: response.data.email,
      id: response.data.id,
    };

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    return usuario;
  },

  async buscarPorId(id) {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },
};
