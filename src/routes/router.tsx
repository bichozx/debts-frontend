import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthRedirect from '../components/AuthRedirect';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateLayout from '../components/PrivateLayout';
import ProtectedRoute from '../components/routesProtected/ProtectedRoute';
import Register from '../pages/Register';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<AuthRedirect />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Private */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
