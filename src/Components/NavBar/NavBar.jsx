import React, { useContext } from 'react';
import { Context } from '../ContextAPI/ContextAPI';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { user, userLogOut, setRole } = useContext(Context)
    const navigate = useNavigate()

    const handleLogOut = () => {
        userLogOut()
        navigate('/login')
        setRole(null)
    }
    return (
        <div className='p-5 bg-blue-800 text-white flex justify-between'>
            <div className='ml-10'>
                <h1 className='text-3xl font-bold'>Sell Point of X</h1>
            </div>
            <div className='mr-10'>
                {
                    user ?
                        <button onClick={handleLogOut} className='btn'>Log Out</button>
                        :
                        <button onClick={() => navigate('/login')} className='btn'>Log In</button>
                }
            </div>
        </div>
    );
};

export default NavBar;