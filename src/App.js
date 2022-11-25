import { Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useHttp from './modules/use-http';
import ForgotPassword from './pages/ForgotPassword';
import { AuthContext } from './store/auth-context';
import { getProfile } from './api/auth';
import Blog from './pages/Blogs';

function App() {
  const authCtx = useContext(AuthContext);
  const { setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(getProfile);
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest, setUser]);
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      } else setUser(null);
    }
  }, [data, setUser, status]);
  return (
    <div className='App'>
      <Routes>
        <Route path='Sign-In' element={<SignIn />} />
        <Route path='Sign-Up' element={<SignUp />} />
        <Route path='Forgot-Password' element={<ForgotPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='Privacy' element={<Privacy />} />
        <Route path='Terms' element={<Terms />} />
        <Route path='About' element={<About />} />
        <Route path='Blogs' element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
