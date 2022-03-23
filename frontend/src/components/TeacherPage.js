import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarTeacher from "./NavbarTeacher";

function TeacherPage() {

    const [Courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        photo: "",
        pdf: "",
        teacher:"",
    });

    const handleChange = ({ currentTarget: input }) => {
        setNewCourse({ ...newCourse, [input.name]: input.value });
    };

    const TeacherID = JSON.parse(localStorage.getItem("token"));
    console.log(TeacherID[2])	

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/courses", newCourse)
            .then(response => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        retrieveCourses()
    }, []);

    const retrieveCourses = () => {
        axios.get("http://localhost:5000/courses/" + TeacherID[2], Courses)
            .then((response) => {
                setCourses(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error);

            });
    }

    const addCourse = () => {
        newCourse.teacher = TeacherID[2]
        document.getElementById('new-course-form').style.display = "block";
        
    }

    const updateCourse = () =>{
        document.getElementById('updated-course-form').style.display = "block"
    }

    const editCourse = (id) => {
        axios.put(`http://localhost:5000/courses/${id}`, newCourse)
            .then((response) => {
                setCourses(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error);

            });
    }

    const deleteCourse = (id) => {
        axios.delete(`http://localhost:5000/courses/${id}`)
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
                                <button className='course-button' onClick={() => updateCourse()}>Edit</button>
                                <button className='course-button' onClick={() => deleteCourse(Course._id)}>Delete</button>

                            </div>
                        </div>
                        <div id="updated-course-form">
                            <form className="form_container" onSubmit={() => editCourse(Course._id)}>
                                <h2>Edit The Course</h2>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    onChange={handleChange}
                                    value={newCourse.title}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    onChange={handleChange}
                                    value={newCourse.description}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="Photo"
                                    name="photo"
                                    onChange={handleChange}
                                    value={newCourse.photo}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="PDF"
                                    name="pdf"
                                    onChange={handleChange}
                                    value={newCourse.pdf}
                                    className="input"
                                    style={{ marginBottom: "50px" }}
                                />
                                <button type="submit" className="course-button">
                                    Update Course
                                </button>
                            </form>
                            </div>
                        </>
                        )
                }))}
                        return (
                        <div>
                            <NavbarTeacher />
                            <div className="teacher-header">
                                <h1 className='get-started'>MY COURSES</h1>
                                <h2 className='new-course'>__________Latest Courses__________</h2>
                            </div>
                            <div class="">
                                {displayCourses()}
                            </div>
                            <div className="add-lesson-sign">
                                <img onClick={() => addCourse()} className="add-lesson-img" height='auto' src="./add.png"></img>
                            </div>
                            <div id="new-course-form">
                                <form className="form_container" onSubmit={handleSubmit}>
                                    <h2>Add A New Course</h2>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        onChange={handleChange}
                                        value={newCourse.title}
                                        className="input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        name="description"
                                        onChange={handleChange}
                                        value={newCourse.description}
                                        className="input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Photo"
                                        name="photo"
                                        onChange={handleChange}
                                        value={newCourse.photo}
                                        className="input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="PDF"
                                        name="pdf"
                                        onChange={handleChange}
                                        value={newCourse.pdf}
                                        className="input"
                                        style={{ marginBottom: "50px" }}
                                    />
                                    <button type="submit" className="course-button">
                                        Add Course
                                    </button>
                                </form>
                            </div>
                        </div>
                        )
}

                        export default TeacherPage