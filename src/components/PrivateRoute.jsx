import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children, usuarioLogado, loading }) {
  if (loading) {
    return null; // ou um spinner de carregamento, se desejar
  }
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
