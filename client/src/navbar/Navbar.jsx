import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import "./Navbar.css";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const clearToken = () => {
    Cookie.remove("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <nav>
        <Link to={"/"} className="logo">
          Hotel Mahendra <br /> store software
        </Link>

        {/* Hamburger button */}
        <button
          className="hamburger lg:hidden"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Menu items */}
        <ul
          className={`lg:flex ${isMenuOpen ? "block" : "hidden"} lg:static absolute top-[8vh] left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:flex-row flex-col lg:items-center items-start border lg:border-0`}
        >
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Purchasing Item
          </Link>

          <Link to="/sale" className="nav-link" onClick={() => setMenuOpen(false)}>
            Sale
          </Link>

          <Link to="/stock" className="nav-link" onClick={() => setMenuOpen(false)}>
            Stock
          </Link>

          <Link to="/modify-stock" className="nav-link" onClick={() => setMenuOpen(false)}>
            Modify Stock
          </Link>

          <Link
            className="nav-link bg-red-500 text-white"
            onClick={() => {
              clearToken();
              setMenuOpen(false);
            }}
          >
            Logout
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
