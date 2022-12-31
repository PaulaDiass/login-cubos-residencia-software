import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { getLocalItem } from './utils/sessionStorage';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RecoverPassword from './pages/RecoverPassword';
import RegisterPassword from './pages/RegisterPassword';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const ProtectRoutes = ({ redirectTo }: any) => {
  const token = getLocalItem('token');
  const isAuthenticated = token ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/recover-password" element={<RecoverPassword />} />

      <Route path="/register-password/:token" element={<RegisterPassword />} />

      <Route element={<ProtectRoutes redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProjectRoutes;
