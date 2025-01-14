import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const App = () => {
  return (
    <div className='min-h-[100vh] w-[100vw]'>
      {/* Navbar */}
      <header >
        <Navbar />
      </header>
      
      {/* Main content */}
      <main >
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
