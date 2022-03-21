const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

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

UsersSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Users = mongoose.model("Users", UsersSchema);


const validate2 = (data) => {
	const schema = Joi.object({
		fullname: Joi.string().min(3).required().label("Full Name"),
		email: Joi.string().email().required().label("Email"),
		photo: Joi.string().label("Photo"),
        age: Joi.number().max(100).required().label("Age"),
		password: passwordComplexity().required().label("Password"),
        userType: Joi.string().required().label("User Type"),
	});
	return schema.validate(data);
};

module.exports = { Users, validate2 };