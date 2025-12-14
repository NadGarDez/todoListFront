import React, { type JSX, useEffect, useState } from "react";
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Chip, 
    Select,         
    MenuItem,       
    InputLabel,     
    FormControl,
    FormHelperText 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { TaskInterface } from "../../types";
import { staticTask } from "../../constants";

const PRIMARY_ORANGE = "#FF9900";
const MAX_TAGS = 3; 

interface TaskFormProps {
    task: TaskInterface;
    back: () => void;
    onSubmit: (data: TaskInterface) => void;
}

export const TaskForm = (props: TaskFormProps): JSX.Element => {
    const { task, back, onSubmit } = props;

    // 1. Estado para manejar los campos (inicializado con el prop 'task')
    const [formData, setFormData] = useState<TaskInterface>(task);
    const [selectedLabel, setSelectedLabel] = useState<string>(''); 

    // 2. Sincronizar el estado interno cuando el prop 'task' cambie.
    // Esto es crucial para reutilizar el formulario en modo edición con diferentes IDs.
    useEffect(() => {
        setFormData(task);
    }, [task]); // Se ejecuta cada vez que el objeto 'task' cambia (generalmente por su 'id' o referencia)


    const isEditMode = task.id !== '';
    const tagLimitReached = formData.labels.length >= MAX_TAGS; 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddLabel = (label: string) => {
        const trimmedLabel = label.trim();
        
        if (!tagLimitReached && trimmedLabel && !formData.labels.includes(trimmedLabel)) {
            setFormData(prev => ({
                ...prev,
                labels: [...prev.labels, trimmedLabel]
            }));
        }
        setSelectedLabel('');
    };

    const handleDeleteLabel = (labelToDelete: string) => {
        setFormData(prev => ({
            ...prev,
            labels: prev.labels.filter(label => label !== labelToDelete)
        }));
    };

    const handleSubmit = () => {
        if (formData.title.trim()) {
            onSubmit(formData);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2
            }}
        >
            <Typography
                variant="subtitle1"
                component="h3"
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
                {isEditMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}
            </Typography>

            <TextField
                label="Título de la tarea"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                size="medium"
            />

            <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                size="medium"
            />

            {/* Select para Etiquetas Estáticas */}
            <FormControl fullWidth size="small" variant="outlined" disabled={tagLimitReached}>
                <InputLabel id="select-label">Agregar Etiqueta</InputLabel>
                <Select
                    labelId="select-label"
                    id="select-tag"
                    value={selectedLabel} 
                    label="Agregar Etiqueta"
                    onChange={(e) => handleAddLabel(e.target.value as string)}
                    disabled={tagLimitReached} 
                >
                    <MenuItem value="" disabled>
                        {tagLimitReached ? 'Límite de 3 etiquetas alcanzado' : 'Selecciona una etiqueta'}
                    </MenuItem>
                    
                    {staticTask
                        .filter(label => !formData.labels.includes(label)) 
                        .map((label) => (
                        <MenuItem key={label} value={label}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={tagLimitReached}>
                    {formData.labels.length} / {MAX_TAGS} etiquetas seleccionadas.
                </FormHelperText>
            </FormControl>

            {/* Lista de Etiquetas Agregadas (Chips) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '30px', mb: 2 }}>
                {formData.labels.map((label) => (
                    <Chip
                        key={label}
                        label={label}
                        size="medium"
                        onDelete={() => handleDeleteLabel(label)}
                        deleteIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            backgroundColor: PRIMARY_ORANGE,
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                ))}
            </Box>

            {/* Botones de Acción (sin cambios) */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={back}
                    sx={{ color: PRIMARY_ORANGE, borderColor: PRIMARY_ORANGE }}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!formData.title.trim()}
                    sx={{ backgroundColor: PRIMARY_ORANGE, '&:hover': { backgroundColor: '#E68A00' } }}
                >
                    {isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}
                </Button>
            </Box>
        </Box>
    );
}