import React, { type JSX } from "react";
import { Box, Typography } from "@mui/material";
import { TaskItem } from "./TaskItem";
import type { TaskInterface } from "../../types";

interface TaskListProps {
    tasks: TaskInterface[];
    onPressDetail: (item: TaskInterface) => void
    onPressDelete: (item: TaskInterface) => void
}

const TaskList = (props: TaskListProps): JSX.Element => {
    const { tasks, onPressDelete, onPressDetail } = props;

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
                    onDelete={onPressDelete}
                    onPressDetail={onPressDetail}
                />
            ))}
        </Box>
    );
}

export default TaskList;