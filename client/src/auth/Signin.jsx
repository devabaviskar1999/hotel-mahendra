import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Signin.css"

const Signin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const server_url = import.meta.env.VITE_SERVER_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server_url}/auth/signin`, {
        name,
        password,
      }, {withCredentials: true});
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r min-h-[80vh]">
      <div className="bg-white p-14 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"  // Disable autocomplete for this field
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"  // Disable autocomplete for this field
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className=" button w-full p-3 bg-blue-700 text-white rounded-lg focus:outline-none transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to={"/signup"} className="text-blue-600 hover:text-blue-700 text-sm">
            Don't have an account? Signup
          </Link>
        </div>

        {alertMessage && (
          <div className="mt-4 text-red-500 text-center">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
