import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, NavItem, NavLink } from "react-bootstrap"
import Logout from "./Logout";
import '../css/Navbar.css'

function NavbarTeacher() {
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
                    <Link to={"/teacherPage"} className='logo'>
                        <h2 style={{marginTop: "25px"}}>COURSMANIA</h2>
                    </Link>
                </NavItem>
                <div className='nav-components-teacher'>
                    <NavItem eventKey="Courses">
                        <Link to={"/teacherPage"} className="nav-items">
                            <span>Courses</span>
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

export default NavbarTeacher