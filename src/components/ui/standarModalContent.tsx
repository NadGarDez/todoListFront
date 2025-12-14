import React, { type JSX } from 'react';
import { Box, Typography, Button } from '@mui/material';

const PRIMARY_ORANGE = "#FF9900";

interface StandardModalContentProps {
    title: string;
    subtitle: string;
    onCancel: () => void;
    onAction: () => void; 
    actionLabel: string; 
    isActionDangerous?: boolean; 
}

export const StandardModalContent = (props: StandardModalContentProps): JSX.Element => {
    const { 
        title, 
        subtitle, 
        onCancel, 
        onAction, 
        actionLabel,
        isActionDangerous = false,
    } = props;

    const actionColor = isActionDangerous ? '#D32F2F' : PRIMARY_ORANGE; // Rojo de MUI si es peligroso
    const actionHoverColor = isActionDangerous ? '#C62828' : '#E68A00'; 

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
                {title}
            </Typography>
            
            <Typography 
                variant="caption" 
                color="text.secondary"
            >
                {subtitle}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    width: '60%', 
                    justifyContent: 'space-between', 
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
                    onClick={onAction}
                    sx={{
                        backgroundColor: actionColor,
                        '&:hover': {
                            backgroundColor: actionHoverColor,
                        },
                        minWidth: 'auto', 
                    }}
                >
                    {actionLabel}
                </Button>
            </Box>
        </Box>
    );
}

export default StandardModalContent;