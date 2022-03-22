//CONNECT TO DATABASE
const Courses = require('../models/Courses')

//GET COURSES
exports.getCourses = async (req, res) => {
  try {
    const Course = await Courses.find()
    res.json(Course);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}


// ADD OR POST Courses
exports.addCourses = async (req, res) => {
  const newCourse = new Courses({
    title: req.body.title,
    pdf: req.body.pdf,
    description: req.body.description,
    photo: req.body.photo,
    teacher: req.body.teacher,
    students: req.body.students
  });

  try {
    await newCourse.save();
    res.json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//DELETE Courses
exports.deleteCourses = async (req, res) => {
  const CourseId = req.params.id;
  try {
    const data = await Courses.deleteOne({ _id: CourseId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//EDIT OR UPDATE Courses
exports.editCourses = async (req, res) => {
  const CourseId = req.params.id;
  const newCourse = {
    title: req.body.title,
    pdf: req.body.pdf,
    description: req.body.description,
    photo: req.body.photo,
    teacher: req.body.teacher,
    students: req.body.students
  };
  try {
    const updateCourses = await Courses.findByIdAndUpdate({ _id: CourseId }, newCourse);
    res.json(updateCourses);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}