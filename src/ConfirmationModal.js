import React, { useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import BookingRequest from './BookingRequest';
import { reserveTime } from './fetching';


export default function ConfirmationModal(props) {

    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [submittedIdentifier, setSubmittedIdentifier] = useState("");

    const confirmBooking = (identifier) => {
        
        reserveTime(props.termin_id, identifier).then(response => {
            if (response.ok) {
                setBookingConfirmed(true);
                setSubmittedIdentifier(identifier);
            }
        });
    }

    return(
        bookingConfirmed
        ? <BookingConfirmation handleClose={props.handleClose} nick={submittedIdentifier} date={props.date}/>
        : <BookingRequest date={props.date} confirmBooking={confirmBooking} handleClose={props.handleClose}/>
    )

}