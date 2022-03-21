const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    photo: String,
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    students: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }]
  
}, { timestamps: true })


module.exports = mongoose.model('Courses', coursesSchema)