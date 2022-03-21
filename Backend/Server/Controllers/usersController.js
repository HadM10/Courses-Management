//CONNECT TO DATABASE
const Users = require('../models/Users')


// ADD OR POST Users
exports.addUser = async (req, res) => {
  const newUser = new Users({
    fullname: req.body.fullname,
    email: req.body.email,
    photo: req.body.photo,
    age: req.body.age,
    password: req.body.password,
    userType: req.body.userType
  });

  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}


//EDIT OR UPDATE Users
exports.editUsers = async (req, res) => {
  const UserId = req.params.id;
  const newUser = {
    fullname: req.body.fullname,
    email: req.body.email,
    photo: req.body.photo,
    age: req.body.age,
    password: req.body.password,
    userType: req.body.userType
  };
  try {
    const updateUsers = await Users.findByIdAndUpdate({ _id: UserId }, newUser);
    res.json(updateUsers);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}