import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='container mx-auto mt-6  min-h-[calc(100vh-68px)] px-2 md:px-2 lg:px-0'>
            {/* Navbar */}
            <Navbar></Navbar>
            {/* Outlet */}
            <div>
                <Outlet></Outlet>
                
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;