import User from "../models/user.js";

const signInHandler = async (req, res) => {
  const {name, password} = req.body
  if(!name, !password){
    return res.status(400).json({error: "Invalid credentials!"})
  }
  const checkUserInDatabase = await User.find({name, password})
  if(checkUserInDatabase){
    return res.status(400).json({error: "User already exist"})
  }
  const newUser = await User.create({
    name: name,
    password: password
  })

  console.log(newUser)
  return res.status(201).json({message: "new user is created"})
}



export default signInHandler;