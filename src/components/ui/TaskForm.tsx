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
import { useFormik } from 'formik'; // CLAVE 1: Importar useFormik

const PRIMARY_ORANGE = "#FF9900";
const MAX_TAGS = 3; 

interface TaskFormProps {
    task: TaskInterface;
    back: () => void;
    onSubmit: (data: TaskInterface) => void;
}

export const TaskForm = (props: TaskFormProps): JSX.Element => {
    const { task, back, onSubmit } = props;

    const [selectedLabel, setSelectedLabel] = useState<string>(''); 

    const formik = useFormik({
        initialValues: task, 
        onSubmit: (values) => {
            console.log(values)
            onSubmit(values);
        },
        enableReinitialize: true, 
    });
    

    const isEditMode = task.id !== '';
    const tagLimitReached = formik.values.labels.length >= MAX_TAGS; 

    const handleAddLabel = (label: string) => {
        const trimmedLabel = label.trim();
        const currentLabels = formik.values.labels;
        
        if (!tagLimitReached && trimmedLabel && !currentLabels.includes(trimmedLabel)) {
            formik.setFieldValue('labels', [...currentLabels, trimmedLabel]);
        }
        setSelectedLabel('');
    };

    const handleDeleteLabel = (labelToDelete: string) => {
        const updatedLabels = formik.values.labels.filter(label => label !== labelToDelete);
        formik.setFieldValue('labels', updatedLabels);
    };

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
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

            {/* Campo Título - Conectado a Formik */}
            <TextField
                label="Título de la tarea"
                // CLAVE 5: Uso de getFieldProps para vincular valor, onChange y onBlur
                {...formik.getFieldProps('title')} 

                fullWidth
                required
                variant="outlined"
                size="medium"
                // Si usas validación, aquí irían 'error' e 'helperText' de Formik
            />

            {/* Campo Descripción - Conectado a Formik */}
            <TextField
                label="Descripción"
                // CLAVE 5: Uso de getFieldProps para vincular valor, onChange y onBlur
                {...formik.getFieldProps('description')}
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
                        .filter(label => !formik.values.labels.includes(label)) 
                        .map((label) => (
                        <MenuItem key={label} value={label}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={tagLimitReached}>
                    {formik.values.labels.length} / {MAX_TAGS} etiquetas seleccionadas.
                </FormHelperText>
            </FormControl>

            {/* Lista de Etiquetas Agregadas (Chips) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '30px', mb: 2 }}>
                {formik.values.labels.map((label) => (
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

            {/* Botones de Acción */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={back}
                    sx={{ color: PRIMARY_ORANGE, borderColor: PRIMARY_ORANGE }}
                    disabled={formik.isSubmitting} 
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!formik.values.title.trim() || formik.isSubmitting} 
                    sx={{ backgroundColor: PRIMARY_ORANGE, '&:hover': { backgroundColor: '#E68A00' } }}
                >
                    {formik.isSubmitting 
                        ? 'Procesando...' 
                        : (isEditMode ? 'Guardar Cambios' : 'Crear Tarea')
                    }
                </Button>
            </Box>
        </Box>
    );
}