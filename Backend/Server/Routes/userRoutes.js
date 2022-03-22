const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const Joi = require("joi");
const usersController = require('../Controllers/usersController');
const {Users, validate2} = require('../Models/Users')


router.post("/register", async (req, res) => {
	try {
		const { error } = validate2(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Users.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Users({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.post("/login", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await Users.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        // const token = user.generateAuthToken();
        const token = user.userType
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.route('/')
    .get(usersController.FindUser)

router.route('/:id')
    .put(usersController.editUsers)

module.exports = router