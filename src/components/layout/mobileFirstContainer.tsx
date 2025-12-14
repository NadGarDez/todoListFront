import React, { type JSX, type ReactNode } from "react";
import { Box, Paper } from "@mui/material";

// La interfaz espera que este componente reciba el contenido que va a contener
interface MobileFirstContainerProps {
    children: ReactNode;
}

const MobileFirstContainer = ({ children }: MobileFirstContainerProps): JSX.Element => {
    return (
        <Box
            component={Paper} 
            elevation={8} 
            
            sx={{
                height: '78vh', 
                
                width: {
                    xs: '90vw',  
                    sm: '70vw',  
                    md: '450px', 
                },

                borderRadius: 4, 
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                
                p: 3, 
                
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
            
        </Box>
    );
}

export default MobileFirstContainer;