const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Users schema 
const UsersSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        required: true,
        trim: false,
        unique: true,
        min: 6,
        max: 45,
    },
    photo: {
        type: String,
        required: false,
        trim: false,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minimum: 6,
        max: 255      // max 255 because we may later decide to encrypt the password
    },
    userType: {
        type: String,
        enum:["Admin", "Teacher", "Student"]
    }
   
}, { timestamps: true });

module.exports = mongoose.model("Users", UsersSchema);