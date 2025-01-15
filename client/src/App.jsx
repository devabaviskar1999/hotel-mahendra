import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const App = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[120px] pb-[60px]"> {/* Adjusted padding for Navbar/Footer height */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white fixed bottom-0 left-0 z-50">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
