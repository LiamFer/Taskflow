import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Boards from "./Pages/Boards/Boards";
import Landing from "./Pages/Landing/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      { index: true, element: <Landing /> },
      { path: "boards/:boardID", element: <Boards /> },
    ],
  },
]);
