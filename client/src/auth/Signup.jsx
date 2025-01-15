import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length <= 7) {
        setAlertMessage("Password should be greater than 7!");
        navigate("/signin");
      } else if (name.length <= 3) {
        setAlertMessage("Name should be greater than 3!");
        navigate("/signin");
      } else {
        const response = await axios.post("http://localhost:4000/auth/signup", {
          name,
          password,
        }, {withCredentials: true});
        if (response) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Login failed: " + error.response.data.message);
    }
  };
  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to={"/signin"}>Signin</Link>
      {alertMessage ? <span>{alertMessage}</span> : null}
    </div>
  );
};

export default Signup;
