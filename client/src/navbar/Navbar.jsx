import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to={"/"} className="logo">
          Hotel Mahendra <br /> store software
        </Link>
        <ul>
          <Link to="/purchased" className="nav-link">
            Purchasing Item
          </Link>

          <Link to="/sale" className="nav-link">
            Sale
          </Link>

          <Link to="/stock" className="nav-link">
            Stock
          </Link>

          <Link to="/modify-stock" className="nav-link">
            Modify Stock
          </Link>

          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="fixed w-full bg-orange-600 z-50">
//       {/* Top Navbar Container */}
//       <div className="flex items-center justify-between px-8 py-4">
//         {/* Brand */}
//         <Link
//           to="/"
//           className="text-white text-lg font-bold leading-tight" // Added leading-tight for better spacing
//         >
//           Hotel Mahendra <br /> Store Software
//         </Link>

//         {/* Hamburger Menu Button */}
//         <button
//           className="lg:hidden p-2 text-white"
//           onClick={() => setMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Desktop Links */}
//       <nav className="hidden lg:flex flex-row items-center w-full bg-yellow-300"> {/* Changed layout for proper centering */}
//         <ul className="flex space-x-8 py-4"> {/* Added py-4 for vertical spacing */}
//           <Link to="/purchased" className="text-lg text-white">
//             Purchasing Item
//           </Link>
//           <Link to="/sale" className="text-lg text-white">
//             Sale
//           </Link>
//           <Link to="/stock" className="text-lg text-white">
//             Stock
//           </Link>
//           <Link to="/modify-stock" className="text-lg text-white">
//             Modify Stock
//           </Link>
//           <Link to="/logout" className="text-lg text-white">
//             Logout
//           </Link>
//         </ul>
//       </nav>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-orange-700 text-white flex flex-col items-center space-y-4 py-4">
//           <Link to="/purchased" onClick={() => setMenuOpen(false)}>
//             Purchasing Item
//           </Link>
//           <Link to="/sale" onClick={() => setMenuOpen(false)}>
//             Sale
//           </Link>
//           <Link to="/stock" onClick={() => setMenuOpen(false)}>
//             Stock
//           </Link>
//           <Link to="/modify-stock" onClick={() => setMenuOpen(false)}>
//             Modify Stock
//           </Link>
//           <Link to="/logout" onClick={() => setMenuOpen(false)}>
//             Logout
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
