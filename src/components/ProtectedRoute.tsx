import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  requireAdmin?: boolean;
};

export default function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
  const token = localStorage.getItem('@Vocalize:token');
  const role = localStorage.getItem('@Vocalize:role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
