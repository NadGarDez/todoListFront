import React, { type JSX, type ReactNode } from "react";
import { Box, Paper } from "@mui/material";

interface MobileFirstContainerProps {
    children: ReactNode;
}

const MobileFirstContainer = ({ children }: MobileFirstContainerProps): JSX.Element => {
    return (
        <Box
            component={Paper} 
            elevation={8} 
            
            sx={{
                position: 'relative', 
                height: '85vh', 
                width: {
                    xs: '90vw',  
                    sm: '70vw',  
                    md: '450px', 
                },
                borderRadius: 4, 
                p: 0, 
                overflow:'hidden',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto', 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
        >
            
            <Box 
                sx={{
                    flexGrow: 1, 
                    overflowY: 'auto', 
                }}
            >
                {children}
            </Box>


            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex:20,
                    width: '100%',
                    height: '24px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start', 
                    backgroundColor: 'transparent', 
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                }}
            >
                <Box
                    sx={{
                        width: '35%', 
                        height: '5px', 
                        borderRadius: '10px', 
                        backgroundColor: '#757575', 
                        marginTop: '8px', 
                    }}
                />
            </Box>
            
        </Box>
    );
}

export default MobileFirstContainer;