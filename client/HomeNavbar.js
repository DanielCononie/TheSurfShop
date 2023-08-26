import React from "react";
import { Link } from 'react-router-dom'

function HomeNavbar() {
    return (
        <div className="HomeNavbar">
            <ul>
                <li><label>SeaLyfe</label></li>
                <li><Link to='/Product' className="home-links">Products</Link></li>
                <li><Link to='Admin' className="home-links">Admin</Link></li>
            </ul>

        </div>
    )
}

export default HomeNavbar;