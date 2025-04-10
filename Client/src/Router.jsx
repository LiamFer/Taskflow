import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Boards from "./Pages/Boards/Boards";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [{ path: "boards/:boardID", element: <Boards /> }],
  },
]);
