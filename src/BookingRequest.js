import React, {useState} from 'react';
import { TextField, Typography, Paper, Button, Popover } from '@mui/material';

const style = {
    position: 'absolute',
    display: "grid",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: {
        xs: "80%",
        sm: "0"
    },
    maxWidth: 400,
    bgcolor: 'background.paper',
    p: {
        xs: 1,
        sm: 2,
    }
};

export default function BookingRequest(props) {
    
    const [userIdentifier, setUserIdentifier] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const popoverOpen = Boolean(anchorEl);
    const popoverId = popoverOpen ? 'simple-popover' : undefined;

    const handleClosePopover = e => {
        setAnchorEl(null);
    }

    const handleBooking = (e) => {
        if (userIdentifier.length > 2)
            props.confirmBooking(userIdentifier);
        else {
            setAnchorEl(e.currentTarget);
        }
    }

    return(
        <Paper sx={style}>
            <Typography align="center">Ausgewähltes Datum: </Typography>
            <Typography align="center" sx={{marginBottom: 2, fontWeight: "500"}}>{props.date}</Typography>
            <Typography align="center"
                sx={{marginBottom: 2}}
            >Bitte gib einen (fiktiven) Namen zur Buchung an, um dich damit identifizieren zu können</Typography>
            <TextField value={userIdentifier} onChange={e => setUserIdentifier(e.target.value)} />
            <Button onClick={handleBooking} variant="contained"
                sx={{
                    marginTop: 2
                }}
            >Buchung abschließen</Button>
            <Popover
                id={popoverId}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Typography align="center" sx={{p: 2}}>Der Name muss mindestens 3 Zeichen lang sein</Typography>
            </Popover>
            <Button onClick={props.handleClose} variant="contained" color="error"
                sx={{
                    marginTop: 2
                }}
            >Zurück</Button>
        </Paper>
    )
}