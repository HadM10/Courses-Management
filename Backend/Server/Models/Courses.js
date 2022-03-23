const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    photo: String,
    pdf: String,
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    teachername: String,
    students: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }]
  
}, { timestamps: true })


module.exports = mongoose.model('Courses', coursesSchema)