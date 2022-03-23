import React, { useEffect, useState } from "react";
import '../css/TeacherPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from "../axios";
import NavbarAdmin from "./NavbarAdmin";

function TeacherListforAdmin() {
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        retrieveStudentList()
    }, []);

    const retrieveStudentList = () => {
        axios.get("http://localhost:5000/users/getlist")
            .then((response) => {
                setTeacherList(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error);

            });
    }


        const displayCourses = () => {
            return (
                teacherList.map((student) => {
                    return (
                        <div> {student.fullname}</div>
    )
                    })
            )
                }


    return (<div>{displayCourses}</div>)

}

export default TeacherListforAdmin();