import React, { type JSX } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const PRIMARY_ORANGE = "#FF9900";

interface HomeHeaderProps {
    onPressLogOut: () => void;
}

const HomeHeader = (props: HomeHeaderProps): JSX.Element => {
    const { onPressLogOut } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'white',
                borderBottom: '1px solid #EEEEEE',
                position: 'sticky'
            }}
        >
            <Typography
                variant="h5" 
                component="h1"
                sx={{
                    fontFamily: 'Roboto, Arial, sans-serif', 
                    fontWeight: 900, 
                    color: PRIMARY_ORANGE, 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    marginLeft: 1,
                    marginY: 1
                }}
            >
                TodoList
            </Typography>

            <IconButton
                onClick={onPressLogOut}
                size="medium" // Tamaño medio
                sx={{
                    color: PRIMARY_ORANGE,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 153, 0, 0.1)',
                    },
                    marginRight: 1,
                    marginY: 1
                }}
                aria-label="Cerrar Sesión"
            >
                <LogoutIcon fontSize="medium" />
            </IconButton>

        </Box>
    );
}

export default HomeHeader;