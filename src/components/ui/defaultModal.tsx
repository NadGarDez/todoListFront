import React, { type JSX, type ReactNode } from "react";
import { Box, Button } from "@mui/material";

// Colores de la paleta
const PRIMARY_ORANGE = "#FF9900";

interface DefaultModalProps {
    relativeHeight: string;
    visible: boolean;
    onChangeVisibility: (visibility: boolean) => void;
    children: ReactNode;
}

export const DefaultModal = (props: DefaultModalProps): JSX.Element => {
    const { children, visible, onChangeVisibility, relativeHeight } = props;

    const handleClose = () => {
        onChangeVisibility(false);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',

                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <Box
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 300ms ease-in-out',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: relativeHeight,
                    zIndex: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    boxShadow: '0 -8px 20px rgba(0, 0, 0, 0.15)',
                    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
                    transition: `transform 250ms ease-out`,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={handleClose}
                        variant="text"
                        sx={{
                            margin: 1,
                            color: PRIMARY_ORANGE,
                        }}
                    >
                        Close
                    </Button>
                </Box>

                <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100% - 60px)' }}>
                    {children}
                </Box>

            </Box>
        </Box>
    );
};

export default DefaultModal;