import React, { type JSX } from "react";
import { Box, Typography } from "@mui/material";
import { TaskItem } from "./TaskItem"; // Asegúrate de que la ruta sea correcta

interface Task {
    id: string;
    title: string; 
    labels: string[];
    description: string; 
}

interface TaskListProps {
    tasks: Task[];
}


// --- FUNCIONES MOCKEADAS (para que TaskItem funcione) ---
const handleDeleteTask = (id: string) => {
    console.log(`[TaskList] - Simulación: Eliminando tarea con ID: ${id}`);
};

const handlePressDetail = (id: string) => {
    console.log(`[TaskList] - Simulación: Viendo detalles de tarea con ID: ${id}`);
};
// --------------------------------------------------------


const TaskList = (props: TaskListProps): JSX.Element => {
    const { tasks } = props;

    if (tasks.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    No tienes tareas pendientes. ¡Hora de crear una!
                </Typography>
            </Box>
        );
    }


    return (
        <Box 
            sx={{ 
                width: '100%', 
                maxHeight: 500,
                overflow: 'scroll'
            }}
        >
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    labels={task.labels}
                    description={task.description}
                    onDelete={handleDeleteTask}
                    onPressDetail={handlePressDetail}
                />
            ))}
        </Box>
    );
}

export default TaskList;