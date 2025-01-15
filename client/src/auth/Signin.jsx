import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/signin", {
        name,
        password,
      });
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.response.data.message);
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
      </form>'
      <Link to={"/signup"}>Signup</Link>
      {alertMessage ? <span>{alertMessage}</span> : null}
    </div>
  );
};

export default Signin;
