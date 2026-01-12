import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore/auth.store';

export default function AuthRedirect() {
  const token = useAuthStore((s) => s.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
