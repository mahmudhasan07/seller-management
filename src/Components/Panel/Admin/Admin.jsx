import React, { useContext } from 'react';
import '../Panel.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import SellerApprove from './SellerApprove';
import { Context } from '../../ContextAPI/ContextAPI';
const Admin = () => {
    const navigate = useNavigate()
    const { userLogOut } = useContext(Context)
    
    const handleLogOut = () => {
        userLogOut()
        navigate('/login')
        setRole(null)
    }

    return (
        <section id='admin' className='text-black flex'>
            <div id='admin_navbar' className='bg-blue-800 fixed h-full text-center text-white w-1/6'>
                <ul className='top-1/4 relative text-lg font-semibold'>
                    <NavLink to={'/admin'}><li className='my-2'>Seller Approve</li></NavLink>
                    <NavLink to={'/admin/sellreport'}><li className='my-2'>Today's Sell</li></NavLink>
                    <button onClick={handleLogOut} className='btn'>Log Out</button>
                </ul>
            </div>
            <div className='w-3/5 bg-white mx-auto p-3'>
                <Outlet></Outlet>
            </div>

        </section>
    );
};

export default Admin;