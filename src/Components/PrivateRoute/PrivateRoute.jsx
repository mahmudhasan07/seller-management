import React, { useContext } from 'react';
import { Context } from '../ContextAPI/ContextAPI';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const { user, loading, role, userLogOut } = useContext(Context);
console.log(loading);


    if (loading && !user) {
        return "loading"
    }
    if (user && role === 'admin') {
        return <Navigate to={'/admin'}></Navigate>
    }
    if (user && role === 'seller') {
        return <Navigate to={'/seller'}></Navigate>
    }

    userLogOut()

    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoute;