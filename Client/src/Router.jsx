import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
  },
]);
