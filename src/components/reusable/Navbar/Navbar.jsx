import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import search from '../../../assets/icons/search.svg';
import logo from '../../../assets/logo.svg';
import { useAuth } from '../../../hooks/useAuth';
import SearchResult from './SearchResult/SearchResult';

function Navbar() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  return (
    <>
      <header>
        <nav className="container">
          {/* <!-- Logo --> */}
          <div>
            <Link to="/">
              <img className="w-32" src={logo} alt="lws" />
            </Link>
          </div>

          {/* <!-- Actions - Login, Write, Home, Search -->
        <!-- Notes for Developers -->
        <!-- For Logged in User - Write, Profile, Logout Menu -->
        <!-- For Not Logged in User - Login Menu --> */}
          <div>
            <ul className="flex items-center space-x-5">
              <li>
                <Link
                  to="/create-blog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
              <li>
                <div
                  onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={search} alt="Search" />
                  <span>Search</span>
                </div>
              </li>

              {!auth?.accessToken && (
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    {' '}
                    Login{' '}
                  </Link>
                </li>
              )}

              {auth?.accessToken && (
                <li className="flex items-center">
                  {/* <!-- Circular Div with background color --> */}
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="">S</span>
                    {/* <!-- User's first name initial --> */}
                  </div>

                  {/* <!-- Logged-in user's name --> */}
                  <Link to="/profile">
                    <span className="text-white ml-2">Saad Hasan</span>
                  </Link>
                  {/* <!-- Profile Image --> */}
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {isSearchBarOpen &&
        createPortal(
          <SearchResult setIsSearchBarOpen={setIsSearchBarOpen} />,
          document.body
        )}
    </>
  );
}

export default Navbar;
