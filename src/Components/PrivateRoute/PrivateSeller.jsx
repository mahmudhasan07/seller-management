import React, { useContext } from 'react';
import { Context } from '../ContextAPI/ContextAPI';
import { Navigate } from 'react-router-dom';

const PrivateSeller = ({ children }) => {
    const { roleLoading, user, role, userLogOut } = useContext(Context)
    if (roleLoading && role == null) {
        return "loading"
    }
    if (user && role === 'seller') {
        return children
    }
    userLogOut()
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateSeller;