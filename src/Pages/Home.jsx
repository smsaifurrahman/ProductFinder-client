import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2 className='text-3xl text-center' >Welcome to ProductFinder</h2>

            <div>
                {/* <Outlet></Outlet> */}
            </div>
        </div>
    );
};

export default Home;