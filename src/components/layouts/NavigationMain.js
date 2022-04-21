import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import NavigationMainItem from './NavigationMainItem';
import './navigation.main.css';

const NavigationMain = (props) => {
    
    useEffect(
        () => {
            window.addEventListener('scroll', navbarShrink);
            
            return () => window.removeEventListener('scroll', navbarShrink);
        }, []);
    
    
    const navbarShrink = () => {
        const mainNavigation = document.getElementById('main-navigation');

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            mainNavigation.classList.remove('py-4');
        }else {
            mainNavigation.classList.add('py-4');
        }
    }

    return (
        <nav id="main-navigation" 
            className="navbar navbar-expand-sm bg-light navbar-light py-4 fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={ props.logo } alt="Logo" style={{ width:"40px"}} className="rounded-pill" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <NavigationMainItem to="/" text="Home"/>
                    <NavigationMainItem to="/about" text="About" />
                    <NavigationMainItem to="/contact" text="Contact Us" />
                    <NavigationMainItem to="/todo" text="Todo" />
                    <li className="nav-item text-center dropdown">
                        
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Dropdown</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Link</a></li>
                            <li><a className="dropdown-item" href="#">Another link</a></li>
                            <li><a className="dropdown-item" href="#">A third link</a></li>
                        </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationMain;