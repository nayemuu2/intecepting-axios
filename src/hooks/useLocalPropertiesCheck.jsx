/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';

function useLocalPropertiesCheck() {
  const [propertiesChecked, setPropertieshChecked] = useState(false);
  const { auth, setAuth } = useAuth();
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    // Checking user was logged in or not
    const localAuth = localStorage.getItem('auth');
    const localProfile = localStorage.getItem('profile');
    // console.log('localAuth = ', localAuth);

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.refreshToken) {
        // console.log('accessToken = ', auth.accessToken);
        // console.log('refreshToken = ', auth.refreshToken);

        setAuth({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        });
      }
    }

    if (localProfile) {
      const profile = JSON.parse(localProfile);
      // console.log('profile = ', profile);
      setProfile(profile);
    }

    // console.log('LocalPropertiesChecked');
    setPropertieshChecked(true);
  }, []);

  return propertiesChecked;
}

export default useLocalPropertiesCheck;
