import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fakeAPI } from '../services/api';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 20px;
`;

const MotionWrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
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
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #00a859;
  color: white;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

export function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: '', codigo: '', quantidade: '', preco: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    fakeAPI.getProducts().then(setProdutos);
  }, []);

  const adicionarProduto = () => {
    if (!form.nome || !form.codigo || !form.preco) return alert('Preencha todos os campos obrigatórios');
    const atualizados = [...produtos];
    if (editIndex !== null) {
      atualizados[editIndex] = { ...form, quantidade: Number(form.quantidade), preco: Number(form.preco) };
    } else {
      atualizados.push({ ...form, quantidade: Number(form.quantidade), preco: Number(form.preco) });
    }
    setProdutos(atualizados);
    setShowForm(false);
    setForm({ nome: '', codigo: '', quantidade: '', preco: '' });
    setEditIndex(null);
  };

  const editarProduto = (index) => {
    const produto = produtos[index];
    setForm(produto);
    setEditIndex(index);
    setShowForm(true);
  };

  const excluirProduto = (index) => {
    const atualizados = produtos.filter((_, i) => i !== index);
    setProdutos(atualizados);
  };

  const exportarCSV = () => {
    const rows = ['Produto,Código,Quantidade,Preço'].concat(
      produtos.map(p => `${p.nome},${p.codigo},${p.quantidade},${p.preco}`)
    );
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'estoque.csv';
    link.click();
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    p.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  return (
    <Container>
      <MotionWrap
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TopBar>
          <Input placeholder="Pesquisar produtos" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
          <Button onClick={() => setShowForm(true)}>Adicionar</Button>
          <Select><option>Ordenar</option></Select>
          <Select><option>Exibir</option></Select>
          <Select><option>Tags</option></Select>
          <Select><option>Categoria</option></Select>
          <Button onClick={exportarCSV}>Exportar</Button>
        </TopBar>

        {showForm && (
          <div style={{ marginBottom: '20px' }}>
            <h3>{editIndex !== null ? 'Editar Produto' : 'Novo Produto'}</h3>
            <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            <Input placeholder="Código" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} />
            <Input placeholder="Quantidade" type="number" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} />
            <Input placeholder="Preço" type="number" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} />
            <Button onClick={adicionarProduto}>{editIndex !== null ? 'Atualizar' : 'Salvar'}</Button>
          </div>
        )}

        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Código</Th>
              <Th>Quantidade</Th>
              <Th>Valor</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginados.map((p, i) => (
              <tr key={i}>
                <Td>{p.nome}</Td>
                <Td>{p.codigo}</Td>
                <Td>{p.quantidade || 0}</Td>
                <Td>R$ {p.preco}</Td>
                <Td>
                  <Button onClick={() => editarProduto(inicio + i)}>Editar</Button>
                  <Button onClick={() => excluirProduto(inicio + i)} style={{ backgroundColor: '#dc3545' }}>Excluir</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(totalPaginas)].map((_, i) => (
            <Button key={i} onClick={() => setPaginaAtual(i + 1)}>{i + 1}</Button>
          ))}
        </Pagination>
      </MotionWrap>
    </Container>
  );
}
