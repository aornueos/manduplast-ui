import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const UsuarioAPI = {
  login: (email, senha) =>
    api.post('/usuarios/login', { email, senha }).then((res) => res.data),

  cadastrar: (dados) =>
    api.post('/usuarios/cadastro', dados).then((res) => res.data),
};
