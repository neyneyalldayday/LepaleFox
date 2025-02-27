import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const isAdmin = user && user.letInBtown.role === 'admin';

    return isAdmin ? children : <Navigate to='/'/>;

}

export default ProtectedRoute