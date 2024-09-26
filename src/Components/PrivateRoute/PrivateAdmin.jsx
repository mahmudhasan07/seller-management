import React, { useContext } from 'react';
import { Context } from '../ContextAPI/ContextAPI';
import { Navigate } from 'react-router-dom';

const PrivateAdmin = ({ children }) => {
    const { roleLoading, user, role, userLogOut } = useContext(Context)
    console.log(role);

    if (roleLoading && role == null) {
        return "loading"
    }
    if (user && role == 'admin') {
        return children
    }


    userLogOut()
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateAdmin;