import React, { type JSX, useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Icono de tres puntos
import TaskLabel from "./taskLabel";
import type { TaskInterface } from "../../types";

type TaskItemProps = {
    onDelete: (item: TaskInterface) => void;
    onPressDetail: (item: TaskInterface) => void;
} & TaskInterface

const PRIMARY_ORANGE = "#FF9900";

export const TaskItem = (props: TaskItemProps): JSX.Element => {
    const {  onDelete, onPressDetail, ...item } = props;

    const { title, labels, description} = item;

    // Estado para controlar el menú de opciones (tres puntos)
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
                
                {/* Botón de Tres Puntos (Opciones) */}
                <IconButton 
                    onClick={handleClickMenu}
                    size="small"
                    aria-controls={open ? 'task-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ p: 0 }} // Eliminar padding extra para hacerlo compacto
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>

                {/* Menú de Opciones */}
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
                        sx={{ color: '#D32F2F' }} // Rojo para la acción de eliminar
                    >
                        Eliminar
                    </MenuItem>
                </Menu>
            </Box>

            {/* SEGUNDA FILA: Lista de Labels */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {labels.map((label, index) => (
                    // Asumimos que TaskLabel maneja el color aleatorio basado en el label
                    <TaskLabel key={index} label={label} />
                ))}
            </Box>

            {/* TERCERA FILA: Descripción */}
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontSize: 12, // Fuente pequeña
                    fontWeight: '200',
                    
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, // Limita el texto a 2 líneas
                    lineHeight: '1.4em', // Altura de línea para controlar el corte
                    maxHeight: '2.8em', // 2 líneas * 1.4em
                    color: '5C5C5C'
                }}
            >
                {description}
            </Typography>
        </Box>
    );
}