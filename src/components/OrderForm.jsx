import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #00a859;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 10px;
  min-width: 120px;
  border-radius: 6px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  background-color: #00a859;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const FormCard = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  max-width: 500px;
`;

export function OrderForm() {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    cliente: '',
    produto: '',
    quantidade: '',
    pagamento: 'Pix',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(dados);
  }, []);

  const salvarPedidos = (lista) => {
    setPedidos(lista);
    localStorage.setItem('pedidos', JSON.stringify(lista));
  };

  const adicionarPedido = () => {
    if (!form.cliente || !form.produto || !form.quantidade) {
      return alert('Preencha todos os campos obrigatórios');
    }
    const atualizados = [...pedidos];
    if (editIndex !== null) {
      atualizados[editIndex] = form;
    } else {
      atualizados.push(form);
    }
    salvarPedidos(atualizados);
    setShowForm(false);
    setForm({ cliente: '', produto: '', quantidade: '', pagamento: 'Pix' });
    setEditIndex(null);
  };

  const editarPedido = (index) => {
    const pedido = pedidos[index];
    setForm(pedido);
    setEditIndex(index);
    setShowForm(true);
  };

  const excluirPedido = (index) => {
    const atualizado = pedidos.filter((_, i) => i !== index);
    salvarPedidos(atualizado);
  };

  const pedidosFiltrados = pedidos.filter(
    (p) =>
      p.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      p.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  return (
    <Container>
      <TopBar>
        <Input
          placeholder="Pesquisar pedidos"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button onClick={() => setShowForm(true)}>Adicionar Pedido</Button>
      </TopBar>

      {showForm && (
        <FormCard>
          <h3>{editIndex !== null ? 'Editar Pedido' : 'Novo Pedido'}</h3>
          <Input
            placeholder="Nome do Cliente"
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
          />
          <Input
            placeholder="Produto"
            value={form.produto}
            onChange={(e) => setForm({ ...form, produto: e.target.value })}
          />
          <Input
            placeholder="Quantidade"
            type="number"
            value={form.quantidade}
            onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
          />
          <Select
            value={form.pagamento}
            onChange={(e) => setForm({ ...form, pagamento: e.target.value })}
          >
            <option>Pix</option>
            <option>Dinheiro</option>
            <option>Cartão</option>
          </Select>
          <Button onClick={adicionarPedido}>{editIndex !== null ? 'Atualizar' : 'Salvar'}</Button>
        </FormCard>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Cliente</Th>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
              <Th>Pagamento</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {pedidosPaginados.map((p, i) => (
              <tr key={i}>
                <Td>{p.cliente}</Td>
                <Td>{p.produto}</Td>
                <Td>{p.quantidade}</Td>
                <Td>{p.pagamento}</Td>
                <Td>
                  <Button onClick={() => editarPedido(inicio + i)}>Editar</Button>
                  <Button
                    onClick={() => excluirPedido(inicio + i)}
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    Excluir
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination>
        {[...Array(totalPaginas)].map((_, i) => (
          <Button key={i} onClick={() => setPaginaAtual(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Pagination>
    </Container>
  );
}
