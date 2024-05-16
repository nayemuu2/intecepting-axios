/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/reusable/Footer/Footer';
import Navbar from '../../components/reusable/Navbar/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import {
  errorToastMessage,
  successToastMessage,
} from '../../utils/toastifyUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiRequestStatus, setApiRequestStatus] = useState(false);

  const { auth, setAuth } = useAuth();
  const { profile, setProfile } = useProfile();

  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('email = ', email);
    // console.log('password = ', password);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('data =', response.data);
      successToastMessage('You successfully logged in.');
      // console.log('accessToken =', response.data.token.accessToken);
      // console.log('refreshToken =', response.data.token.refreshToken);
      setAuth({
        accessToken: response.data.token.accessToken,
        refreshToken: response.data.token.refreshToken,
      });

      setProfile(response.data.user);

      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: response.data.token.accessToken,
          refreshToken: response.data.token.refreshToken,
        })
      );

      localStorage.setItem('profile', JSON.stringify(response.data.user));

      navigate('/');
    } catch (error) {
      if (error?.response?.data?.error) {
        errorToastMessage(error.response.data.error); // our custom error message
      } else if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <section className="container">
          {/* <!-- Login Form into a box center of the page --> */}
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Login
                </button>
              </div>
              <p className="text-center">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
