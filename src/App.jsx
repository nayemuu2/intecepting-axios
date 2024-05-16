import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Loader from './components/reusable/Loader/Loader';
import useLocalPropertiesCheck from './hooks/useLocalPropertiesCheck';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import EditBlog from './pages/EditBlog/EditBlog';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import SingleBlog from './pages/SingleBlog/SingleBlog';

export default function App() {
  const localPropertiesChecked = useLocalPropertiesCheck();

  if (!localPropertiesChecked) {
    return (
      <div className="flex justify-center mt-7">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        {/* <Route path="/profile" element={<MyProfile />} /> */}
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Routes>
    </Router>
  );
}
