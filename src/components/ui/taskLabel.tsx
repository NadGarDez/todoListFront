import React, { type JSX, useMemo } from "react";
import { Box, Typography } from "@mui/material";

interface TaskLabelProps {
    label: string;
}

const COLOR_PALETTE: string[] = [
    '#00A388', 
    '#2979FF', 
    '#8E24AA', 
    '#D81B60', 
    '#004D40', 
    '#5E35B1', 
    '#FF7043', 
    '#455A64', 
    '#388E3C', 
    '#C0CA33', 
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