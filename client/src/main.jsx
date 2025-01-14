import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from './auth/Signup.jsx';
import Signin from './auth/Signin.jsx';
import Home from './home/Home.jsx';
import ProtectiveRoute from './ProtectiveRoute.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin/>,
      },
      {
        path: "home",
        element: (
          <ProtectiveRoute>
            <Home/>
          </ProtectiveRoute>
        )
      },
      {
        path: "*", // Catch-all route for undefined paths
        element: <h1>404 - Page Not Found</h1>,
      },
    
    ],
  },
]);

// Render the RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);