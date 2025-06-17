import api from './api';

export const PedidoAPI = {
  async listar() {
    const response = await api.get('/pedidos');
    return response.data;
  },

  async salvar(dados) {
    const response = await api.post('/pedidos', dados);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/pedidos/${id}`, dados);
    return response.data;
  },

  async excluir(id) {
    await api.delete(`/pedidos/${id}`);
  },
};
