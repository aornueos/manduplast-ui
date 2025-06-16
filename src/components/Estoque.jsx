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

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  padding: 10px;
  min-width: 150px;
  margin-top: 5px;
  margin-bottom: 2px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #00a859;
  color: white;
  margin-top: 5px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap; /* Impede quebra de linha */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Select = styled.select`
  padding: 10px;
  min-width: 120px;
  margin-top: 5px;
  margin-bottom: 2px;
  border: 1px solid #ccc;
  border-radius: 6px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  display: table;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
  font-size: 14px;
`;

const Th = styled.th`
  background-color: #00a859;
  color: white;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  white-space: nowrap;
`;

const ActionsTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  width: 180px;
  display: table-cell;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
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
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [ordenar, setOrdenar] = useState('');
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    quantidade: '',
    preco: '',
    categoria: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(dados);
  }, []);

  const salvarProdutos = (lista) => {
    setProdutos(lista);
    localStorage.setItem('produtos', JSON.stringify(lista));
  };

  const adicionarProduto = () => {
    if (!form.nome || !form.codigo || !form.preco)
      return alert('Preencha todos os campos obrigatórios');

    const atualizado = [...produtos];
    if (editIndex !== null) {
      atualizado[editIndex] = {
        ...form,
        quantidade: Number(form.quantidade),
        preco: Number(form.preco),
      };
    } else {
      atualizado.push({
        ...form,
        quantidade: Number(form.quantidade),
        preco: Number(form.preco),
      });
    }

    salvarProdutos(atualizado);
    setShowForm(false);
    setForm({ nome: '', codigo: '', quantidade: '', preco: '', categoria: '' });
    setEditIndex(null);
  };

  const editarProduto = (index) => {
    const produto = produtos[index];
    setForm(produto);
    setEditIndex(index);
    setShowForm(true);
  };

  const excluirProduto = (index) => {
    const atualizado = produtos.filter((_, i) => i !== index);
    salvarProdutos(atualizado);
  };

  const exportarCSV = () => {
    const rows = ['Produto,Código,Quantidade,Preço,Categoria'].concat(
      produtos.map((p) => `${p.nome},${p.codigo},${p.quantidade},${p.preco},${p.categoria}`)
    );
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'estoque.csv';
    link.click();
  };

  let produtosFiltrados = produtos
    .filter(
      (p) =>
        (p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          p.codigo.toLowerCase().includes(filtro.toLowerCase())) &&
        (categoriaFiltro === '' || p.categoria === categoriaFiltro)
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
      <TopBar>
        <Input
          placeholder="Pesquisar produtos"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button onClick={() => setShowForm(true)}>Adicionar</Button>
        <Select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
          <option value="">Ordenar</option>
          <option value="nome-asc">Nome A-Z</option>
          <option value="nome-desc">Nome Z-A</option>
          <option value="preco-asc">Preço Menor</option>
          <option value="preco-desc">Preço Maior</option>
        </Select>
        <Select value={itensPorPagina} onChange={(e) => setItensPorPagina(Number(e.target.value))}>
          <option value={5}>Exibir 5</option>
          <option value={10}>Exibir 10</option>
          <option value={15}>Exibir 15</option>
        </Select>
        <Select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
          <option value="">Todas Categorias</option>
          <option value="Eletronico">Eletrônico</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Alimento">Alimento</option>
        </Select>
        <Button onClick={exportarCSV}>Exportar</Button>
      </TopBar>

      {showForm && (
        <FormCard>
          <h3>{editIndex !== null ? 'Editar Produto' : 'Novo Produto'}</h3>
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
            <Input
              placeholder="Categoria"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />
            <Button onClick={adicionarProduto}>
              {editIndex !== null ? 'Atualizar' : 'Salvar'}
            </Button>
          </FormRow>
        </FormCard>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Código</Th>
              <Th>Quantidade</Th>
              <Th>Valor</Th>
              <Th>Categoria</Th>
              <Th style={{ width: '200px' }}>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginados.map((p, i) => (
              <tr key={i}>
                <Td>{p.nome}</Td>
                <Td>{p.codigo}</Td>
                <Td>{p.quantidade || 0}</Td>
                <Td>R$ {p.preco}</Td>
                <Td>{p.categoria}</Td>
                <ActionsTd>
                  <ButtonGroup>
                    <Button onClick={() => editarProduto(inicio + i)}>Editar</Button>
                    <Button
                      onClick={() => excluirProduto(inicio + i)}
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
        {[...Array(totalPaginas)].map((_, i) => (
          <Button key={i} onClick={() => setPaginaAtual(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Pagination>
    </Container>
  );
}
