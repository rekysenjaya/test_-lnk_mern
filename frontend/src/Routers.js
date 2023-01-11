import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Calculator from "./container/calculator";
import Home from "./container/home";
import Login from "./container/login";
import Profile from "./container/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

function Routers() {
  return (
    <div>
      <RouterProvider router={router} fallbackElement={<div>Loading ...</div>} />
    </div>
  );
}


export default Routers;