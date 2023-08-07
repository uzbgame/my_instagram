import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN } from '../constantsFile/routes';

const LoginNavigate = ({ user, children}) => {
    if (!user) {
        return <Navigate to={LOGIN} replace />;
    }

    return children;
};

export default LoginNavigate;
