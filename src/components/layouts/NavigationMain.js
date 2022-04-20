import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationMain = (props) => {
    
    return (
        <nav id="main-navigation" 
            className="navbar navbar-expand-sm bg-light navbar-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={ props.logo } alt="Logo" style={{ width:"40px"}} className="rounded-pill" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className={ ({isActive}) => "nav-link" + (isActive ? " active" : "") } 
                                to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={ ({isActive}) => "nav-link" + (isActive ? " active" : "") } 
                                to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={ ({isActive}) => "nav-link" + (isActive ? " active" : "") } 
                                to="/contact">Contact Us</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        
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