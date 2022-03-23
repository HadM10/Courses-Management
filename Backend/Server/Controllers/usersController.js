//CONNECT TO DATABASE
const Users = require('../Models/Users')


//FIND All USERS
exports.FindUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({})
    res.json(allUsers);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}



//FIND ONE USER
exports.FindUser = async (req, res) => {
  try {
    const theUser = await Users.findById({_id: req.params.id})
    res.json(theUser);
    console.log(theUser)
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