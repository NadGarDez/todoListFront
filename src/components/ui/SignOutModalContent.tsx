import React, { type JSX } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CLIENT_ID, COGNITO_DOMAIN, LOGOUT_URL } from '../../constants'; 

interface SignOutModalContentProps {
    onCancel: () => void;
}

const PRIMARY_ORANGE = "#FF9900";

const SignOutModalContent = (props: SignOutModalContentProps): JSX.Element => {
    const { onCancel } = props;

    const signOut = () => { 
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(LOGOUT_URL)}`;
    };

    return ( 
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 1, 
            }}
        >
            <Typography 
                variant="subtitle1" 
                component="h2" 
                sx={{ 
                    fontWeight: 600,
                    fontSize: '1rem', 
                }}
            >
                ¿Estás seguro de que quieres cerrar sesión?
            </Typography>
            
            <Typography 
                variant="caption" 
                color="text.secondary"
            >
                Serás redirigido a la página de inicio de sesión.
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    width: '60%',
                    justifyContent: 'space-around', 
                }}
            >
                <Button
                    variant="text"
                    size="small" 
                    onClick={onCancel}
                    sx={{
                        color: PRIMARY_ORANGE,
                        minWidth: 'auto', 
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    size="small" 
                    onClick={signOut}
                    sx={{
                        backgroundColor: PRIMARY_ORANGE,
                        '&:hover': {
                            backgroundColor: '#E68A00',
                        },
                        minWidth: 'auto', 
                    }}
                >
                    Aceptar
                </Button>
            </Box>
        </Box>
    );
}

export default SignOutModalContent;