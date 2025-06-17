import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  return usuarioLogado ? children : <Navigate to="/login" />;
}
