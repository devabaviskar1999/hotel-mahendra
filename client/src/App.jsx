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
      <main className="min-h-[80vh]  flex flex-col  items-center pt-4"> {/* Adjusted padding for Navbar/Footer height */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative top-1">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
