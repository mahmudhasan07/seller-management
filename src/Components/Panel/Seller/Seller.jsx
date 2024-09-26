import React, { useContext, useRef, useState } from 'react';

import { Form, NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../Panel.css'
import OrderList from './OrderList';
import { Context } from '../../ContextAPI/ContextAPI';
// import { Context } from '../../ContextAPI/ContextAPI';
const Seller = () => {
    const navigate = useNavigate()
    const { userLogOut } = useContext(Context)

    const handleLogOut = () => {
        userLogOut()
        navigate('/login')
        setRole(null)
    }

    return (
        <section id='seller' className='flex overflow-y-auto'>
            <div id='seller_navbar' className='bg-blue-800 fixed h-full text-center text-white w-1/6'>
                <ul className='top-1/4 relative text-lg font-semibold'>
                    <NavLink to={'/seller'}><li className='my-2'>Sell Product</li></NavLink>
                    <NavLink to={'/seller/sells'}><li className='my-2'>Total Sell</li></NavLink>
                    <button onClick={handleLogOut} className='btn'>Log Out</button>
                    {/* <NavLink className={activeRoute} to={'/shopowners'}><li>Shopkeeper Info</li></NavLink> */}
                </ul>
            </div>
            <div className='w-3/5 bg-white mx-auto p-3'>
                <Outlet></Outlet>
            </div>

        </section>
    );
};

export default Seller;