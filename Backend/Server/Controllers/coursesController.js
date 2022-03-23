//CONNECT TO DATABASE
const Courses = require('../Models/Courses')
const { ObjectId } = require('mongodb')

//GET COURSES
exports.getCourses = async (req, res) => {
  try {
    const Course = await Courses.find()
    res.json(Course);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

//GET  private COURSES
exports.getPrivateCourses = async (req, res) => {
  const userId = req.params.id;
  try {
    const Course = await Courses.find({'students': userId})
    res.json(Course);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

//GET COURSE BY TEACHER

exports.getTeacherCourses = async (req, res) => {
  try {
    const id = req.params.id
    const Course = await Courses.find({ teacher: id })
    .populate({ path: 'teacher', model: 'Users' })
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
    teachername: req.body.teachername,
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

//EDIT OR UPDATE Whole Courses
exports.editCourses = async (req, res) => {
  const CourseId = req.params.id;
  const newCourse = {
    title: req.body.title,
    pdf: req.body.pdf,
    description: req.body.description,
    photo: req.body.photo,
    teacher: req.body.teacher,
    teachername: req.body.teachername,
    students: req.body.students
  };
  try {
    const updateCourses = await Courses.findByIdAndUpdate({ _id: CourseId }, newCourse);
    res.json(updateCourses);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//ADD STUDENT COURSE
exports.addMyCourses = async (req, res) => {
    const courseId = req.body.courseId
    const userId = req.body.userId;

    console.log("userId", userId)
    console.log("courseId", courseId)

    //DATETIME NOT AVAILABLE ANYMORE
    const Course = await Courses.find({ _id: courseId })
    console.log('course', Course[0])
    let myCourses = Course[0]
  
    myCourses.students.push(Object(userId))
    console.log("the courses", myCourses)
    try {
    const newAddedCourse = await Courses.findByIdAndUpdate({ _id: courseId }, myCourses)

    res.json(newAddedCourse);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}



