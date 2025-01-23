import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup.jsx";
import Signin from "./auth/Signin.jsx";
import Home from "./home/Home.jsx";
import ProtectiveRoute from "./ProtectiveRoute.jsx";
import Sale from "./nav-component/Sale.jsx";
import Stock from "./nav-component/Stock.jsx";
import ModifyStock from "./nav-component/Modify-stock.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectiveRoute>
            <Home />
          </ProtectiveRoute>
        ),
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },

      {
        path: "sale",
        element: (
          <ProtectiveRoute>
            <Sale />
          </ProtectiveRoute>
        ),
      },
      {
        path: "stock",
        element: (
          <ProtectiveRoute>
            <Stock />
          </ProtectiveRoute>
        ),
      },
      {
        path: "modify-stock",
        element: (
          <ProtectiveRoute>
            <ModifyStock />
          </ProtectiveRoute>
        ),
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
