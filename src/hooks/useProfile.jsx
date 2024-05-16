import { useContext } from 'react';
import { ProfileContext } from '../context/contexts';

export const useProfile = () => {
  return useContext(ProfileContext);
};
