import type { JSX } from '@emotion/react/jsx-runtime';
import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';

interface ProtectedRouteProps  {
    children: JSX.Element
}

const ProtectedRoute = (props:ProtectedRouteProps):JSX.Element => {

    const {children} = props;
    const {isAuthenticated, isLoading} = useAuth();

    if(isLoading) return <p>Cargando</p>

    if(isAuthenticated) return children

    return <Navigate to="/login" />
};

export default ProtectedRoute;