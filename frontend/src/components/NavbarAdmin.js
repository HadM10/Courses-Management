import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, NavItem, NavLink } from "react-bootstrap"
import Logout from "./Logout";
import '../css/Navbar.css'

function NavbarAdmin() {
    const navigate = useNavigate()
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

    const handleLogout = () => {
        		localStorage.removeItem("token");
        	};

    return (

        <div>
            <Nav className={`nav ${show && 'nav_wood'}`} defaultSelected="Home">
                <NavItem eventKey="Logo">
                    <Link to={"/adminPage"} className='logo'>
                        <h2 style={{marginTop: "25px"}}>COURSMANIA</h2>
                    </Link>
                </NavItem>
                <div className='nav-components'>
                <NavItem eventKey="Courses">
                    <Link to={"/adminPage"} className='nav-items'>
                        <span>Courses</span>
                    </Link>
                </NavItem>
                    <NavItem eventKey="Teachers">
                        <Link to={"/adminPage/teacherslist"} className="nav-items">
                            <span>Teachers</span>
                        </Link>
                    </NavItem>
                    <NavItem eventKey="Students">
                        <Link to={"/adminPage/studentslist"} className="nav-items">
                            <span>Students</span>
                        </Link>
                    </NavItem>
                    <NavItem eventKey="Logout">
                        <Link to={"/login"} className="nav-items">
                            <span onClick={handleLogout}>Logout</span>
                        </Link>
                    </NavItem>
                </div >
            </Nav>
        </div>

    )
}

export default NavbarAdmin