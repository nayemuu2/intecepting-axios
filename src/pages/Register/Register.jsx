import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/reusable/Footer/Footer';
import Navbar from '../../components/reusable/Navbar/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import {
  errorToastMessage,
  successToastMessage,
} from '../../utils/toastifyUtils';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    error: '',
    isSuccess: false,
    data: null,
  });

  const { auth, setAuth } = useAuth();
  const { profile, setProfile } = useProfile();

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('firstName = ', firstName);
    // console.log('lastName = ', lastName);
    // console.log('email = ', email);
    // console.log('password = ', password);

    setApiResponse({
      isLoading: false,
      isError: false,
      error: '',
      isSuccess: false,
      data: null,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/register`,
        { email, password, firstName, lastName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('data =', response.data);
      successToastMessage('You successfully sign up.');
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
      localStorage.setItem('user', JSON.stringify(response.data.user));
      clearForm();

      setApiResponse({
        isLoading: false,
        isError: false,
        error: '',
        isSuccess: true,
        data: null,
      });
    } catch (error) {
      if (error?.response?.data?.error) {
        errorToastMessage(error.response.data.error); // our custom error message
      } else if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }

      setApiResponse({
        isLoading: false,
        isError: false,
        error: 'SomeThing Went Wrong',
        isSuccess: false,
        data: null,
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (apiResponse.isSuccess) {
      clearForm();

      setTimeout(() => {
        navigate('/');
      }, '3000');
    }
  }, [apiResponse]);

  return (
    <div>
      <Navbar />

      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-6">
                <label htmlFor="firstName" className="block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="lastName" className="block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
                  disabled={apiResponse.isLoading}
                  className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  // className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
                  //   apiResponse.isLoading && 'cursor-not-allowed !important'
                  // }`}
                >
                  Create Account
                </button>
              </div>
              <p className="text-center">
                Already have account?{' '}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Register;
