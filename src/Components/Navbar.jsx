/** @format */

import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
    const {logOut, user} = useContext(AuthContext);


       //handle Logout
   const handleLogOut = async () => {
    try {
       await logOut();
       toast.success("You are logged out");
       
    } catch (err) {
       toast.error(err.message);
    }
 };

   return (
      <div className="navbar bg-base-100">
         <div className="flex-1">
            <a className="btn btn-ghost text-xl">ProductFinder</a>
         </div>
         <div className="navbar-end">
            {user ? (
               <div className="dropdown dropdown-end">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           title={user?.displayName}
                           referrerPolicy="no-referrer"
                           alt="Tailwind CSS Navbar component"
                         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-48"
                  >
                     <li className="ml-3 text-xl font-bold">
                        {user?.displayName}
                     </li>
                     

                     <li onClick={handleLogOut}>
                        <Link
                          
                           className=" text-xl font-sans justify-between"
                        >
                           Logout
                        </Link>
                     </li>
                  </ul>
               </div>
            ) : (
               <>
                  {" "}
                  <Link to={"/login"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2">Login</button>{" "}
                  </Link>
                  <Link to={"/register"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold">Register</button>{" "}
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default Navbar;
