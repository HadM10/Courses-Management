import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarUser from "./NavbarUser";

function Studentpage() {

  const [registerCourse, setRegisterCourse] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    retrieveCourses()
  }, []);

  const retrieveCourses = () => {
    axios.get("http://localhost:5000/courses")
      .then((response) => {
        setRegisterCourse(response.data)
        console.log(response.data)
      }).catch((error) => {
        console.log(error);

      });
  }
  console.log(registerCourse)

  const displayCoursesRegister = () => {
    return (
      registerCourse.map((course) => {
        return (


          <div className="flex-container">
            <img src={course.photo} alt="course" className="course-image"></img>
            <div className="course-info">
              <h3 className="course-title">{course.title}</h3>
              <p className='course-description'>{course.description}</p>
              <a href={course.pdf}><button className="course-button">Course PDF</button></a>
            </div>

          </div>
        )
      })
    )
  }

  return (
    <div>
      <NavbarUser />
      {displayCoursesRegister()}
      </div>
  )
}

export default Studentpage