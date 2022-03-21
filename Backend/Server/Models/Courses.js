const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    photo: String,
  
}, { timestamps: true })


module.exports = mongoose.model('Courses', coursesSchema)