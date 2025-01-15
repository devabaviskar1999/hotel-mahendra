import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv"; //secret data keys storage
config();

export const signInHandler = async (req, res) => {
  const { name, password } = req.body;
  try {
    if ((!name, !password)) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const checkUserInDatabase = await User.findOne({ name });
    if (!checkUserInDatabase) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(
      password,
      checkUserInDatabase.password
    );
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: checkUserInDatabase._id },
      process.env.JWT_SECRET,
      { expiresIn: "11h" }
    );
    res.cookie("token", token);
    console.log(token);
    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};
export const signUpHandler = async (req, res) => {
  const { name, password } = req.body;
  try {
    if ((!name, !password)) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const checkUserInDatabase = await User.findOne({ name });
    if (checkUserInDatabase) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "11h",
    });
    res.cookie("token", token);
    console.log(token);
    console.log(newUser);
    return res.status(201).json({ message: "new user is created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signup in", error: error.message });
  }
};
