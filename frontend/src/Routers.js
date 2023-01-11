import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import * as actionAuth from './actions/actionAuth';

import Calculator from "./container/calculator";
import Home, { Loading } from "./container/home";
import Login from "./container/login";
import TimestempPage from "./container/timestemp";

const router = authStatus => createBrowserRouter([
  {
    path: "/",
    element: (authStatus === 'success' ? <Home /> : (authStatus === 'loading' ? <Loading /> : <Login />)),
    children: [
      {
        path: "calculator",
        element: <Calculator />,
      },
    ]
  },
  {
    path: "/users-timestemps",
    element: <TimestempPage />
  }
]);

function Routers() {
  const dispatch = useDispatch();
  const { authStatus } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(actionAuth.getProfile())
  }, [])

  return (
    <div>
      <RouterProvider router={router(authStatus)} fallbackElement={<div>Loading ...</div>} />
    </div>
  );
}


export default Routers;