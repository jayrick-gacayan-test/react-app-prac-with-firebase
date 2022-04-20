import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* bootstrap node module */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

/* custom pages */
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactusPage from './components/pages/ContactusPage';

/* layouts */
import NavigationMain from './components/layouts/NavigationMain';
import logo from './img_avatar.png';
const App = () => {
  return (
    <>
      <NavigationMain logo={ logo }/>
      <Routes>
        <Route exact path="/" element={ <HomePage /> } />
        <Route path="about" element={ <AboutPage /> } />
        <Route path="/contact" element={ <ContactusPage /> } />
      </Routes>
    </>
  );
}

export default App;
