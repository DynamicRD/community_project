import { Navigate } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import '/src/Admin/dashboard/dashboard.css';
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
