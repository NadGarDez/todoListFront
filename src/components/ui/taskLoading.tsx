import { Box, CircularProgress, Typography } from "@mui/material";
import React, {type JSX} from "react";

const PRIMARY_ORANGE = "#FF9900";

const TaskLoadingUI = (): JSX.Element => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh', // Para centrarlo en la vista de la lista
            textAlign: 'center',
            gap: 2,
        }}
    >
        <CircularProgress sx={{ color: PRIMARY_ORANGE }} size={40} />
        <Typography variant="body1" color="text.secondary">
            Cargando tareas...
        </Typography>
    </Box>
);


export default TaskLoadingUI