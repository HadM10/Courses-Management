import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from "react-bootstrap"
import Logout from "./Logout";
import '../css/Navbar.css'

function Navbar() {
    const [show, handleShow] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    const user = localStorage.getItem("token");

    return (

        <div>
            <Nav className={`nav ${show && 'nav_wood'}`} defaultSelected="Home">
                <NavItem eventKey="Logo">
                    <Link to={"/"} className='logo'>
                    </Link>
                </NavItem>
                <div className='nav-components'>
                    <NavItem eventKey="Home">
                        <Link to={"/"} className="nav-items">
                            <span>Home</span>
                        </Link>
                    </NavItem>
                    <NavItem eventKey="Courses">
                        <Link to={"/courses"} className="nav-items">
                            <span>Courses</span>
                        </Link>
                    </NavItem>
                    <NavItem eventKey="Logout">
                        <Link to={"/logout"} className="nav-items">
                            {user}<Logout />
                        </Link>
                    </NavItem>
                </div >
            </Nav>
        </div>

    )
}

export default Navbar