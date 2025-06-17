import api from './api';

export const ProdutoAPI = {
  async listar() {
    const response = await api.get('/produtos');
    return response.data;
  },

  async salvar(dados) {
    const response = await api.post('/produtos', dados);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/produtos/${id}`, dados);
    return response.data;
  },

  async excluir(id) {
    await api.delete(`/produtos/${id}`);
  },
};
