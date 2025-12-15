import type { JSX } from 'react';
import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import { Box, Typography, CircularProgress } from '@mui/material';
import BackgroundLayout from '../components/layout/backgroundLaout';
import MobileFirstContainer from '../components/layout/mobileFirstContainer';

const PRIMARY_ORANGE = "#FF9900";
const COMPLEMENTARY_GREEN = "#00A388";
interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {

    const { children } = props;
    const { isAuthenticated, isLoading , user} = useAuth();


    useEffect(
        () => {
            if(user?.access_token) {
                console.log(user.access_token)
                localStorage.setItem('authToken', user.access_token);
                
            } else {
                localStorage.removeItem('authToken');
            }
        },
        [user] 
    )

    if (isLoading) {
        return (
            <BackgroundLayout>
                <MobileFirstContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            gap: 3,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 900,
                                color: COMPLEMENTARY_GREEN,
                                textTransform: 'uppercase',
                                marginBottom: 2
                            }}
                        >
                            TodoList
                        </Typography>
                        <CircularProgress sx={{ color: PRIMARY_ORANGE }} size={40} />
                        <Typography variant="body1" color="text.secondary">
                            Verificando sesión...
                        </Typography>
                    </Box>
                </MobileFirstContainer>
            </BackgroundLayout>
        );
    }

    if (isAuthenticated) return children

    return <Navigate to="/login" />
};

export default ProtectedRoute;