import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";

const router = createBrowserRouter([

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
  ]);

  export default router