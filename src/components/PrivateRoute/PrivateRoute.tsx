import { getUserRole } from 'store/selectors';
import { useAppSelector } from 'helpers/hooks';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element }: any) => {
  const userRole = useAppSelector(getUserRole);

  return userRole === 'admin' ? element : <Navigate to='/courses' />;
};
