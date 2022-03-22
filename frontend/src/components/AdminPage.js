import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarTeacher from "./NavbarTeacher";

function AdminPage() {
    const [Courses, setCourses] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        retrieveCourses()
    }, []);

    const retrieveCourses = () => {
        axios.get("http://localhost:5000/courses")
            .then((response) => {
                setCourses(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error);

            });
    }


    const displayCourses = () => {
        return (
            Courses.map((Course) => {
                return (
                    <>
                        <div className="flex-container">
                            <img src={Course.photo} alt="course" className="course-image"></img>

                            <div className="course-info">
                                <h3 className="course-title">{Course.title}</h3>
                                <p className='course-description'>{Course.description}</p>

                            </div>
                        </div>
                    </>
                )
            })
        )
    }
    return (
        <div>
            <NavbarTeacher />
            <div className="teacher-header">
            <h1 className='get-started'>ALL COURSES</h1>
            <h2 className='new-course'>__________Latest Courses__________</h2>
            </div>
            <div class="">
                {displayCourses()}
            </div>
            </div>
  )
}

export default AdminPage