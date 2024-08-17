import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";
// import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";
import Main from "../Components/Main";

const router = createBrowserRouter([

    {
      path: "/",
      element: <Main></Main>,
      children: [

        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/products",
          element: <Products></Products>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },

      ],
    }

   
  ]);

  export default router