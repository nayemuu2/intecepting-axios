import axios from 'axios';
import { useEffect } from 'react';
import api from '../api/api';
import { useAuth } from './useAuth';

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        // console.log('config = ', config);
        const accessToken = auth?.accessToken;
        // console.log('accessToken = ', accessToken);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => {
        // console.log('response = ', response);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        console.log('error = ', error);

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (
          (error.response.status === 401 || error.response.status === 403) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await api.post(`/auth/refresh-token`, {
              refreshToken,
            });

            const { accessToken } = response.data;
            setAuth({ ...auth, accessToken: accessToken });
            localStorage.setItem(
              'auth',
              JSON.stringify({
                accessToken: accessToken,
                refreshToken: auth.refreshToken,
              })
            );

            // Retry the original request with the new token

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return { api };
};

export default useAxios;
