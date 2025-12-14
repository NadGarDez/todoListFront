import React, { type JSX, useMemo } from "react";
import { Box, Typography } from "@mui/material";

interface TaskLabelProps {
    label: string;
}

const COLOR_PALETTE: string[] = [
    '#FF8C00', // Naranja Oscuro
    '#CC5500', // Naranja Quemado
    '#8B4513', // Marrón Silla
    '#B8860B', // Oro Oscuro
    '#4E342E', // Marrón Espresso
    '#C49B00', // Mostaza Profundo
    '#B7410E', // Óxido
    '#FF9900', // Naranja Primario
    '#9B7653', // Café con Leche
    '#A29B00', // Amarillo Oliva
];

const getRandomColorFromPalette = (): string => {
    const index = Math.floor(Math.random() * COLOR_PALETTE.length);
    return COLOR_PALETTE[index];
};


const TaskLabel = (props: TaskLabelProps): JSX.Element => {
    const { label } = props;

    const backgroundColor = useMemo(() => getRandomColorFromPalette(), []);

    return ( 
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                backgroundColor: backgroundColor,
                color: 'white', 
                
                borderRadius: '50px', 
                
                padding: '2px 8px', 
                marginRight: 0.5,  
                
                minWidth: '12px', 
                height: '12px', 
                
                lineHeight: 1, 
            }}
        >
            <Typography
                variant="caption" 
                component="span"
                sx={{
                    fontSize: 8, 
                    fontWeight: 600,
                    lineHeight: 1, 
                }}
            >
                {label}
            </Typography>
        </Box>
    );
}

export default TaskLabel;