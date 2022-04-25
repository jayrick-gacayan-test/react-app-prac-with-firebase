import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* bootstrap node module */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle';

import './components/custom.style/basic.css';

/* custom pages */
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactusPage from './components/pages/ContactusPage';
import TodoContainer from './components/Todo/TodoContainer';
import UserLogin from './components/User/UserLogin';
import UserSignUp from './components/User/UserSignUp';

/* layouts */
import NavigationMain from './components/layouts/NavigationMain';
import logo from './img_avatar.png';
const App = () => {
  
  return (
    <>
      <NavigationMain logo={ logo }/>
      <Routes>
        <Route exact path="/" element={ <HomePage /> } />
        <Route path="/about" element={ <AboutPage />} />
        <Route path="/contact" element={ <ContactusPage /> } />
        <Route path="/todo" element={ <TodoContainer /> } />
        <Route path="/login" element={ <UserLogin /> } />
        <Route path="/signup" element={ <UserSignUp /> } />
      </Routes>
    </>
  );
}

export default App;
