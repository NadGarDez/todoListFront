import React, { type JSX } from "react";
import { useAuth } from "react-oidc-context";
import { Box, Typography, Button } from "@mui/material"; // Importación de componentes MUI
import LockIcon from '@mui/icons-material/Lock'; // Icono para el inicio de sesión

import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";

// Colores de la paleta
const PRIMARY_ORANGE = "#FF9900";
const COMPLEMENTARY_GREEN = "#00A388"; // El color que elegimos para el título

const LoginPage = (): JSX.Element => {

    const { signinRedirect } = useAuth();

    const handleLogin = async () => {
       await signinRedirect();
    };


    return (
        <BackgroundLayout>
            <MobileFirstContainer>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', 
                        padding: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{
                            fontWeight: 900, 
                            color: COMPLEMENTARY_GREEN,
                            letterSpacing: '0.05em', 
                            marginBottom: 4,
                            textTransform: 'uppercase',
                        }}
                    >
                        TodoList
                    </Typography>

                    <LockIcon sx={{ fontSize: 80, color: PRIMARY_ORANGE, marginBottom: 2 }} />

                    <Typography 
                        variant="h6" 
                        component="p"
                        color="text.secondary"
                        sx={{
                            marginBottom: 6,
                            fontWeight: 300,
                        }}
                    >
                        Inicia sesión para acceder a tus tareas pendientes.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                        sx={{
                            backgroundColor: PRIMARY_ORANGE,
                            color: 'white',
                            fontWeight: 700,
                            paddingY: 1.5,
                            '&:hover': {
                                backgroundColor: '#E68A00', 
                            }
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default LoginPage;