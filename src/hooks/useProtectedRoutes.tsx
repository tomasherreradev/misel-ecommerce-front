import React, { ReactNode, useEffect } from 'react';
import { useUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useUser();  // Obtenemos también el estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {  // Espera a que la carga termine antes de hacer cualquier redirección
      if (user === null) {
        navigate('/login');
      } else if (user && user.role !== 'admin') {
        navigate('/');
      } else if (user && user.role === 'admin') {
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;  // Muestra el estado de carga hasta que se verifique el usuario
  }

  return <>{user?.role === 'admin' ? children : null}</>;
};

export default ProtectedRoute;
