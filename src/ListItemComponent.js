import { Paper, ListItem, ListItemText, Button, Modal } from '@mui/material';
import React, {useState} from 'react';
import ConfirmationModal from './ConfirmationModal';

const monthMapping = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
]

export default function ListItemComponent(props) {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatDate = (date) => {
        return(
            date.getDate().toString().padStart(2, "0") + ". " + 
            monthMapping[date.getMonth()] + " " + 
            date.getFullYear() + " " + 
            date.getHours().toString().padStart(2, "0") + ":" + 
            date.getMinutes().toString().padStart(2, "0") + " Uhr"
        )
    }

    const handleBooking = () => {
        handleOpen();
    }
    
    return(
        <Paper
            elevation={4}
            sx={{
                marginBottom: 2,
                padding: 1
            }}
        >
            <ListItem key={Date.parse(props.termin)}>
                <ListItemText
                    sx={{marginRight: 1}}
                >
                    {formatDate(props.termin)}
                </ListItemText>
                <Button onClick={handleBooking} variant="contained"  size="small">Buchen</Button>
            </ListItem>
            
            <Modal
                open={open}
                onClose={handleClose}
            >
                <ConfirmationModal handleClose={handleClose} date={formatDate(props.termin)}/>
            </Modal>
        </Paper>
    )
}