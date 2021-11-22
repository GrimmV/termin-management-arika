import React, { useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import BookingRequest from './BookingRequest';


export default function ConfirmationModal(props) {

    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [submittedIdentifier, setSubmittedIdentifier] = useState("");

    const confirmBooking = (identifier) => {
        setBookingConfirmed(true);
        setSubmittedIdentifier(identifier);
    }

    return(
        bookingConfirmed
        ? <BookingConfirmation handleClose={props.handleClose} nick={submittedIdentifier} date={props.date}/>
        : <BookingRequest date={props.date} confirmBooking={confirmBooking} handleClose={props.handleClose}/>
    )

}