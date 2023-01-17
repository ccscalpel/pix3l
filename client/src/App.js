import React, {useContext} from 'react';
import logo from './img/logo.jpg';
import './App.css';
import Gallery from './components/Gallery.js';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Portforlio from './components/Portforlio.js';

import SignUp from './components/userlogin/SignUp';
import SignOut from './components/userlogin/SignOut';
import SignIn from './components/userlogin/SignIn';
import PrivateRoute from './components/userlogin/PrivateRoute';

import {AuthProvider} from './firebase/Auth';
import {AuthContext} from './firebase/Auth';



const App = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext)
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>
              π x 3 l
            </h1>
            <Link className='showlink' to='/gallery/1'>
              Gallery
            </Link>
            <Link className='showlink' to='/portforlio'>
              Portforlio
            </Link>
            { <Link className='showlink' to='/signin'>Log In </Link>}

            { <Link className='showlink' to='/signup'>
              Sign Up
            </Link> }
            { <Link className='showlink' to='/logout'>Log Out</Link> }
            
          </header>
          <br />
          <br />
          <div className='App-body'>
            <Routes>
              <Route path='/' element={<Gallery />}>
              </Route>
              <Route path='/gallery/:pagenum' element={<Gallery />}>
              

              </Route>
              <Route path='/portforlio' element={<PrivateRoute />}>
                <Route path='/portforlio' element={<Portforlio />} />
              </Route>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/logout' element={<SignOut />} />
            </Routes>

          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;