import { Typography, Paper, Button } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute',
    display: "grid",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    p: {
        xs: 1,
        sm: 2,
    }
};

export default function BookingConfirmation(props) {
    return(
        <Paper sx={style}>
            <Typography align="center">
                Vielen Dank {props.nick}!
            </Typography>
            <Typography align="center">
                Du bist jetzt für den {props.date} gebucht.
            </Typography>
            <Button
                sx={{marginTop: 2}}
                variant="contained" onClick={props.handleClose}>Verstanden</Button>
        </Paper>
    )
}