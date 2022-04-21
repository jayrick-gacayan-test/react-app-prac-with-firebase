import React, { useEffect }from 'react';
import { NavLink, useLocation } from 'react-router-dom';
const NavigationMainItem = (props) => {
    const location = useLocation();
    

    
    useEffect(()=>{
            const link = document.querySelector("li.nav-item a[href='" + location.pathname + "']");
            const li = link.closest('li');
            li.classList.add("active");
        },

    [location]);

    const handleListClick = (event) =>{
        const target = event.target;
        const li = target.closest("li");
        const ul = li.closest("ul");

        for(let ulList of [...ul.childNodes]) ulList.classList.remove("active");

        li.classList.add("active");
    }

    return (
        <li className="nav-item text-center" onClick={ handleListClick }>
            <NavLink className={ ({isActive}) => "nav-link" + (isActive ? " active" : "") } 
                    to={ props.to }>{ props.text }</NavLink>
        </li>
    )
}

export default NavigationMainItem;