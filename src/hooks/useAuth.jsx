import { useContext } from 'react';
import { AuthContext } from '../context/contexts';

export const useAuth = () => {
  return useContext(AuthContext);
};
