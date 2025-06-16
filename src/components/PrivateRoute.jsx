import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  return usuario ? children : <Navigate to="/login" />;
}
