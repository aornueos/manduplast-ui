import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProdutoAPI } from '../services/ProdutoAPI';
import { toast } from 'react-toastify';
import axios from 'axios';

const Container = styled.div`padding: 20px;`;
const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
const Button = styled.button`
  padding: 8px 16px;
  background-color: #00a859;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  &:hover { opacity: 0.9; }
`;
const LabelButton = styled.label`
  padding: 8px 16px;
  background-color: #00a859;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover { opacity: 0.9; }
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
const TableWrapper = styled.div`overflow-x: auto;`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  background-color: #00a859;
  color: white;
  padding: 10px;
`;
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;
const ActionsTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
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
`;
const FormRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [ordenar, setOrdenar] = useState('');
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    quantidade: '',
    preco: '',
  });
  const [editId, setEditId] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const carregarProdutos = async () => {
    try {
      const data = await ProdutoAPI.listar();
      setProdutos(data);
    } catch {
      toast.error('Erro ao carregar produtos');
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSubmit = async () => {
    if (!form.nome || !form.codigo || !form.preco) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (editId) {
        await ProdutoAPI.atualizar(editId, form);
        toast.success('Produto atualizado');
      } else {
        await ProdutoAPI.salvar(form);
        toast.success('Produto cadastrado');
      }
      setForm({ nome: '', codigo: '', quantidade: '', preco: '' });
      setEditId(null);
      setShowForm(false);
      carregarProdutos();
    } catch {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleEdit = (produto) => {
    setForm(produto);
    setEditId(produto.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir este produto?')) {
      try {
        await ProdutoAPI.excluir(id);
        toast.success('Produto excluído');
        carregarProdutos();
      } catch {
        toast.error('Erro ao excluir produto');
      }
    }
  };

  const exportarCSV = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:8080/api/arquivos/exportar-produtos', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'produtos.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Exportação concluída!');
    } catch (error) {
      toast.error('Erro ao exportar CSV.');
    }
  };

  const importarCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8080/api/arquivos/importar-produtos', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Importação concluída!');
      carregarProdutos();
    } catch (error) {
      toast.error('Erro ao importar CSV.');
    }
  };

  const produtosFiltrados = produtos
    .filter(
      (p) =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        p.codigo.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => {
      if (ordenar === 'nome-asc') return a.nome.localeCompare(b.nome);
      if (ordenar === 'nome-desc') return b.nome.localeCompare(a.nome);
      if (ordenar === 'preco-asc') return a.preco - b.preco;
      if (ordenar === 'preco-desc') return b.preco - a.preco;
      return 0;
    });

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  return (
    <Container>
      <h2>Gestão de Estoque</h2>
      <TopBar>
        <Input
          placeholder="Pesquisar"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button onClick={() => { setShowForm(true); setForm({ nome: '', codigo: '', quantidade: '', preco: '' }); }}>Adicionar</Button>

        <Button onClick={exportarCSV}>Exportar CSV</Button>

        <LabelButton>
          Importar CSV
          <input
            type="file"
            accept=".csv"
            onChange={importarCSV}
            style={{ display: 'none' }}
          />
        </LabelButton>

        <Select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
          <option value="">Ordenar</option>
          <option value="nome-asc">Nome A-Z</option>
          <option value="nome-desc">Nome Z-A</option>
          <option value="preco-asc">Preço Menor</option>
          <option value="preco-desc">Preço Maior</option>
        </Select>
        <Select value={itensPorPagina} onChange={(e) => setItensPorPagina(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Select>
      </TopBar>

      {showForm && (
        <FormCard>
          <h3>{editId ? 'Editar Produto' : 'Novo Produto'}</h3>
          <FormRow>
            <Input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <Input
              placeholder="Código"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            />
            <Input
              placeholder="Quantidade"
              type="number"
              value={form.quantidade}
              onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
            />
            <Input
              placeholder="Preço"
              type="number"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
            />
            <Button onClick={handleSubmit}>
              {editId ? 'Atualizar' : 'Salvar'}
            </Button>
          </FormRow>
        </FormCard>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Código</Th>
              <Th>Quantidade</Th>
              <Th>Preço</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginados.map((p) => (
              <tr key={p.id}>
                <Td>{p.nome}</Td>
                <Td>{p.codigo}</Td>
                <Td>{p.quantidade}</Td>
                <Td>R$ {p.preco}</Td>
                <ActionsTd>
                  <ButtonGroup>
                    <Button onClick={() => handleEdit(p)}>Editar</Button>
                    <Button
                      onClick={() => handleDelete(p.id)}
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      Excluir
                    </Button>
                  </ButtonGroup>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <Button key={i} onClick={() => setPaginaAtual(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Pagination>
    </Container>
  );
}
