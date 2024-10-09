import React from 'react';
import './navigation.css'
import {NavLink} from "react-router-dom";
function Navigation() {
    return (
        <nav>
<div className="nav-container">
    <h4>Biogventure</h4>

    <ul>
<li>
<NavLink to={'/Home'}>Home</NavLink>
</li>
        <li>
            <NavLink to={'/Overzicht'}>All Posts</NavLink>

        </li>
        <li>
            <NavLink to={'/NewPost'}>NieuwePost</NavLink>

        </li>
    </ul>

</div>
        </nav>
    );
}

export default Navigation;