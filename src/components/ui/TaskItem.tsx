import React, { type JSX, useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import TaskLabel from "./taskLabel";
import type { TaskInterface } from "../../types";

type TaskItemProps = {
    onDelete: (item: TaskInterface) => void;
    onPressDetail: (item: TaskInterface) => void;
} & TaskInterface

export const TaskItem = (props: TaskItemProps): JSX.Element => {
    const {  onDelete, onPressDetail, ...item } = props;

    const { title, labels, description} = item;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDetail = () => {
        onPressDetail(item);
        handleCloseMenu();
    };

    const handleDelete = () => {
        onDelete(item);
        handleCloseMenu();
    };

    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid #F5F5F5', 
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: '#FAFAFA',
                },
                cursor: 'pointer',
                
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5, 
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    
                }}
            >
                <Typography
                    variant="subtitle1"
                    component="h3"
                    onClick={() => onPressDetail(item)} 
                    sx={{
                        fontWeight: 600,
                        flexGrow: 1, 
                        marginRight: 1,
                        color: '#CC5500',
                        
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
                
                <IconButton 
                    onClick={handleClickMenu}
                    size="small"
                    aria-controls={open ? 'task-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ p: 0 }} 
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'three-dots-button',
                    }}
                >
                    <MenuItem onClick={handleDetail}>Ver Detalle</MenuItem>
                    <MenuItem 
                        onClick={handleDelete}
                        sx={{ color: '#D32F2F' }} 
                    >
                        Eliminar
                    </MenuItem>
                </Menu>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {labels.map((label, index) => (
                    <TaskLabel key={index} label={label} />
                ))}
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontSize: 12, 
                    fontWeight: '200',
                    
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, 
                    lineHeight: '1.4em', 
                    color: '5C5C5C'
                }}
            >
                {description}
            </Typography>
        </Box>
    );
}