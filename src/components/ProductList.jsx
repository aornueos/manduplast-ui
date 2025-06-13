import React from 'react';

export function ProductList({ products }) {
  return (
    <div>
      <h2>Produtos Cadastrados</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p.nome} - Código: {p.codigo} - R$ {p.preco}</li>
        ))}
      </ul>
    </div>
  );
}
