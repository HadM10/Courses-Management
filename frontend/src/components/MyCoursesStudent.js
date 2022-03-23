import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarUser from "./NavbarUser";

function MyCoursesStudent() {

  const [myNewCourse, setmyNewCourse] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    retrieveMyCourses()
  }, []);

  const studentId = JSON.parse(localStorage.getItem("token"));

 

const retrieveMyCourses = async () => {
  await axios.get(`http://localhost:5000/courses/myCourses/${studentId[2]}`)
    .then((response) => {
        setmyNewCourse(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error);

    });
}


const displayMyCourses = () => {
  return (
    myNewCourse.map((course) => {
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
    {displayMyCourses()}
  </div>
)
}

export default MyCoursesStudent