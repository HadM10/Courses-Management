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

router.route('/myCourses/:id')
    .get(coursesController.getPrivateCourses)

router.route('/newcourse')
    .post(coursesController.addMyCourses)





module.exports = router