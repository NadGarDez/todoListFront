import React, { type JSX, useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem, CircularProgress } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskLabel from "./taskLabel";
import type { TaskInterface } from "../../types"; 

type TaskItemProps = {
    onDelete: (item: TaskInterface) => void;
    onPressDetail: (item: TaskInterface) => void;
    onPressDone: (item: TaskInterface) => void; 
} & TaskInterface

export const TaskItem = (props: TaskItemProps): JSX.Element => {
    const { onDelete, onPressDetail, onPressDone, ...item } = props;

    const [isToggling, setIsToggling] = useState(false);
    
    const isDisabled = isToggling;

    const { title, labels, description, done } = item;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (!isDisabled) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDetail = () => {
        if (!isDisabled) {
            onPressDetail(item);
            handleCloseMenu();
        }
    };

    const handleDelete = () => {
        if (!isDisabled) {
            onDelete(item);
            handleCloseMenu();
        }
    };
    
    const handleToggleDone = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation(); 
        if (isDisabled) return; 

        setIsToggling(true);
        try {
            await onPressDone(item); 
            
        } catch (error) {
            console.error('Error al alternar estado de la tarea (interno):', error);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid #F5F5F5', 
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: isDisabled ? 'white' : '#FAFAFA',
                },
                cursor: isDisabled ? 'default' : 'pointer',
                
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
                    textDecoration: done && !isDisabled ? 'line-through' : 'none', 
                    color: done && !isDisabled ? 'text.secondary' : 'inherit',
                }}
            >
                
                <IconButton 
                    onClick={handleToggleDone} 
                    disabled={isDisabled}
                    size="small" 
                    sx={{ p: 0, mr: 1, color: done ? '#00A388' : '#888888' }}
                >
                    {isToggling ? (
                        <CircularProgress size={20} sx={{ color: '#CC5500' }} />
                    ) : (
                        done ? <CheckCircleIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />
                    )}
                </IconButton>


                <Typography
                    variant="subtitle1"
                    component="h3"
                    onClick={() => onPressDetail(item)}
                    sx={{
                        fontWeight: 600,
                        flexGrow: 1, 
                        marginRight: 1,
                        color: done ? 'text.secondary' : '#CC5500',
                        
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: done ? 'line-through' : 'none',
                    }}
                >
                    {title}
                </Typography>
                
                <IconButton 
                    onClick={handleClickMenu}
                    size="small"
                    disabled={isDisabled}
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
                    <MenuItem onClick={handleDetail} disabled={isDisabled}>Ver Detalle</MenuItem>
                    <MenuItem 
                        onClick={handleDelete}
                        disabled={isDisabled}
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