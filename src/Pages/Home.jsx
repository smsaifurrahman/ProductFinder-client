import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='min-h-[calc(100vh-68px)]'>
            <h2 className='text-3xl text-center font-bold ' >Welcome to ProductFinder</h2>
            <p className='text-2xl text-center mt-20'> Find all Electronics and Home Appliances You Need </p>

            <div>
                {/* <Outlet></Outlet> */}
            </div>
        </div>
    );
};

export default Home;