import React from 'react';
import { Link, useLocation } from 'react-router';

function Navbar() {
    let location = useLocation();

    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">ReACt NoDePAd</Link>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>




                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {!localStorage.getItem('token') ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/Login' ? 'active' : ""}`} aria-current="page" to="/Login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/Signin' ? 'active' : ""}`} aria-current="page" to="/Signin">SignUp</Link>
                                        </li>
                                    </>) :
                                (<>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/Logout' ? 'active' : ""}`} aria-current="page" to="/Logout">Log Out</Link>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;