import React, { useState } from 'react';
import styled from 'styled-components';
import { fakeAPI } from '../services/api';

const Container = styled.div`
  padding: 20px;
`;

export function PaymentForm() {
  const [metodo, setMetodo] = useState('pix');
  const [status, setStatus] = useState(null);

  const processar = () => {
    fakeAPI
      .processPayment({ metodo, status: 'aprovado' })
      .then(() => setStatus('Pagamento aprovado'));
  };

  return (
    <Container>
      <h2>Pagamento</h2>
      <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
        <option value="pix">PIX</option>
        <option value="cartao">Cartão</option>
        <option value="boleto">Boleto</option>
      </select>
      <button onClick={processar}>Pagar</button>
      {status && <p>{status}</p>}
    </Container>
  );
}
