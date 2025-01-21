import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const App = () => {
  return (
    <div className="">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="min-h-[70vh] bg-yellow-400"> {/* Adjusted padding for Navbar/Footer height */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
