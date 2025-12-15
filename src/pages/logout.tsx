import React, { useEffect, type JSX } from "react";
import { Box, Typography, CircularProgress } from "@mui/material"; // Componentes para UI
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";

const PRIMARY_ORANGE = "#FF9900";

const Logout = (): JSX.Element => {
    
    useEffect(() => {
        const performLogout = () => {
            
            try {
                localStorage.clear();
                sessionStorage.clear();
            } catch (error) {
                console.error("Error al limpiar el almacenamiento:", error);
            }

            // 2. Expirar todas las cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
            });

            setTimeout(() => {
                window.location.replace("/login");
            }, 500); 
        };

        performLogout();
        
    }, []);

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
                        textAlign: 'center',
                        gap: 2,
                    }}
                >
                    <CircularProgress sx={{ color: PRIMARY_ORANGE }} size={40} />
                    
                    <Typography 
                        variant="h6"
                        sx={{ fontWeight: 600, color: PRIMARY_ORANGE }}
                    >
                        Cerrando Sesión...
                    </Typography>

                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                    >
                        Limpiando datos de sesión y cookies.
                    </Typography>
                </Box>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Logout;