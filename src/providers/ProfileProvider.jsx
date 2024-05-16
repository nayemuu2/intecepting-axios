import { useState } from 'react';
import { ProfileContext } from '../context/contexts';

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
