import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarUser from "./NavbarUser";

function Studentpage() {

  const [registerCourse, setRegisterCourse] = useState([]);

  const [studentID, setStudentID] = useState({
    students: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    retrieveCourses()
  }, []);

  const studentId = JSON.parse(localStorage.getItem("token"));

  const confirmCourse = (id) => {

    axios.post("http://localhost:5000/courses/newcourse", {"userId": studentId[2], "courseId" : id})
    .then(response => {
      console.log(response.data)
    })
    .catch(e => {
      console.log(e)
    })
}

const retrieveCourses = async () => {
  await axios.get(`http://localhost:5000/courses/`)
    .then((response) => {
      setRegisterCourse(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error);

    });
}


const displayCoursesRegister = () => {
  return (
    registerCourse.map((course) => {
      return (


        <div className="flex-container">
          <img src={course.photo} alt="course" className="course-image"></img>
          <div className="course-info">
            <h3 className="course-title">{course.title}</h3>
            <h3 className="course-title">Teacher: {course.teachername}</h3>
            <p className='course-description'>{course.description}</p>
            <Link to='/studentPage/courses'><button className='course-button' onClick={() => confirmCourse(course._id)}> Choose Course
            </button>
            </Link>
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