import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const ProdutoAPI = {
  listar: () => api.get('/produtos').then(res => res.data),
  salvar: (produto) => api.post('/produtos', produto).then(res => res.data),
  atualizar: (id, produto) => api.put(`/produtos/${id}`, produto).then(res => res.data),
  excluir: (id) => api.delete(`/produtos/${id}`),
};
