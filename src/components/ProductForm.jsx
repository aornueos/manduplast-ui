import React, { useState } from 'react';
import styled from 'styled-components';
import { fakeAPI } from '../services/api.js';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({ nome: '', codigo: '', preco: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.codigo || !form.preco) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    const exists = (await fakeAPI.getProducts()).some((p) => p.codigo === form.codigo);
    if (exists) {
      setError('Código já cadastrado');
      return;
    }
    await fakeAPI.addProduct(form);
    onProductAdded();
    setForm({ nome: '', codigo: '', preco: '' });
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
      <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} />
      <input
        name="preco"
        type="number"
        placeholder="Preço"
        value={form.preco}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Cadastrar</button>
    </Form>
  );
}
