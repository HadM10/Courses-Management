const express = require('express')
const router = express.Router()
const coursesController = require('../Controllers/coursesController');

router.route('/')
    .get(coursesController.getCourses)
    .post(coursesController.addCourses)

router.route('/:id')
    .put(coursesController.editCourses)
    .delete(coursesController.deleteCourses)
    .get(coursesController.getTeacherCourses)

module.exports = router