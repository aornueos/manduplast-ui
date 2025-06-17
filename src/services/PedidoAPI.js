import api from './api';

export const PedidoAPI = {
  listar: () => api.get('/pedidos'),
  salvar: (pedido) => api.post('/pedidos', pedido),
  atualizar: (id, pedido) => api.put(`/pedidos/${id}`, pedido),
  excluir: (id) => api.delete(`/pedidos/${id}`),
};
