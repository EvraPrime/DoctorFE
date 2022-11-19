import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
