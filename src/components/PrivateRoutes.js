import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

const PrivateRoutes = () => {
    const { auth } = React.useContext(AuthContext);
    console.log(auth);
    return(
        auth.username ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;