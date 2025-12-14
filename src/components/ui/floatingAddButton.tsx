import React, { type JSX } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; // El icono de '+'

// Colores de la paleta
const PRIMARY_ORANGE = "#FF9900";

interface FloatingAddButtonProps {
    onPressAdd: () => void;
}

export const FloatingAddButton = (props: FloatingAddButtonProps): JSX.Element => { 
    const { onPressAdd } = props;

    return (
        <Box
            sx={{
                position: 'absolute', 
                bottom: 30, 
                right: 12, 
                zIndex: 100, 
            }}
        >
            <Fab
                color="primary" 
                aria-label="Agregar Tarea"
                onClick={onPressAdd}
                sx={{
                    backgroundColor: PRIMARY_ORANGE,
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#E68A00', 
                    },
                    width: 50, 
                    height: 50,
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}