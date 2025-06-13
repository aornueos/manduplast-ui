import React, { useState } from 'react';
import styled from 'styled-components';
import { fakeAPI } from '../services/api';

const Container = styled.div`
  padding: 20px;
`;

export function OrderForm() {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const enviarPedido = () => {
    if (!cliente || !produto) return alert('Preencha todos os campos');
    fakeAPI.createOrder({ cliente, produto }).then(p => setPedidos([...pedidos, p]));
    setCliente('');
    setProduto('');
  };

  return (
    <Container>
      <h2>Registro de Pedido</h2>
      <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
      <input placeholder="Produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
      <button onClick={enviarPedido}>Enviar Pedido</button>

      <ul>
        {pedidos.map((p, i) => (
          <li key={i}>{p.cliente} comprou {p.produto}</li>
        ))}
      </ul>
    </Container>
  );
}