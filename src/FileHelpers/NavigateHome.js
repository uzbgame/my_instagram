import React from 'react';
import { HOME } from '../constantsFile/routes';
import { Navigate } from 'react-router-dom';

const NavigateHome = ({ user, children }) => {
    if (user) {
        return <Navigate to={HOME} replace />;
    }

    return children;
};

export default NavigateHome;
