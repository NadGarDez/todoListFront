import React, { type JSX, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram'; // Icono de ejemplo
import LiquidWaveBackground from "../ui/liquidWaveBackground";

// Color de Fondo Mate (Blanco Mate)
const WHITE_MATE = "rgba(255, 255, 255, 0.9)";
// Color Naranja de la Paleta (ejemplo)
const PRIMARY_ORANGE = "#FF9900";

const LIQUID_SECTION_HEIGHT = '10vh'; 


export const CircleLayerAndFooter = ({ children }: { children?: ReactNode }): JSX.Element => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 3, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', 
            }}
        >
            <Box
                sx={{
                    position: 'relative', 
                    width: '100%',
                    height: LIQUID_SECTION_HEIGHT,
                }}
            >
                <LiquidWaveBackground />
                
                <Box sx={{
                    position: 'absolute',
                    top: 0, 
                    width: '100%',
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                }}>
                    {children}
                </Box>
                

                {/* 2. PIE DE PÁGINA (FOOTER) - ANCLADO AL FONDO */}
                <Box
                    component="footer"
                    sx={{
                        position: 'absolute',
                        bottom: 0, // Anclado estrictamente al fondo de la sección
                        width: '100%',
                        padding: 1, 
                        textAlign: 'center',
                        color: PRIMARY_ORANGE, 
                        zIndex: 10, 
                        backgroundColor: 'transparent',
                    }}
                >
                    {/* Sección Designed By con Estilo Fancy */}
                    <Box sx={{ marginBottom: 0.5 }}>
                        <Typography 
                            variant="body2" 
                            component="span" 
                            sx={{
                                color: '#361702ff',
                                fontSize: 12,
                                fontWeight: 'bold',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            Designed By @NadGardez
                        </Typography>
                        
                        {/* Ícono de Red Social */}
                        <InstagramIcon 
                            fontSize="small" 
                            sx={{ 
                                verticalAlign: 'middle', 
                                marginLeft: 1,
                                color: PRIMARY_ORANGE,
                                cursor: 'pointer'
                            }} 
                        />
                    </Box>

                   
                </Box>

            </Box>
            
        </Box>
    );
}

export default CircleLayerAndFooter;