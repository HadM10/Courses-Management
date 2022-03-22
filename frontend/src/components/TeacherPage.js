import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";

function TeacherPage() {

    const [Courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        photo: "",
        pdf: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        setNewCourse({ ...newCourse, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		axios.post("http://localhost:5000/courses", newCourse)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })}


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

    const addCourse = () =>{
        document.getElementById('new-course-form').style.display = "block";
    }

    const editCourse = (id) => {
        axios.put(`http://localhost:5000/courses/${id}`)
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
                                <button className='course-button' onClick={() => editCourse(Course._id)}>Edit</button>
                                <button className='course-button' onClick={() => deleteCourse(Course._id)}>Delete</button>

                            </div>
                        </div>
                    </>
                )
            })
        )
    }
    return (
        <div>
            <h1 className='get-started'>Check All Courses And Enroll</h1>
            <h2 className='new-skill'>__________Latest Courses__________</h2>
            <div class="">
                {displayCourses()}
            </div>
            <div className="add-lesson-sign">
                <img onClick={() => addCourse()} className="add-lesson-img" width='300px' height='auto' src="./add.png"></img>
            </div>
            <div id="new-course-form">
            <form className="form_container" onSubmit={handleSubmit}>
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
                    placeholder="Pdf"
                    name="pdf"
                    onChange={handleChange}
                    value={newCourse.pdf}
                    className="input"
                />
                <button type="submit" className="">
                     Add Course
                </button>
                </form>
            </div>
        </div>
    )
}

export default TeacherPage