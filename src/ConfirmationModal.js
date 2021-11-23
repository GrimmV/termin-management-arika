import React, { useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import BookingRequest from './BookingRequest';
import { reserveTime } from './fetching';


export default function ConfirmationModal(props) {

    const [bookingRequested, setBookingRequested] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [processingRequest, setProcessingRequest] = useState(false);
    const [submittedIdentifier, setSubmittedIdentifier] = useState("");

    const confirmBooking = (identifier) => {

        setProcessingRequest(true);
        
        reserveTime(props.termin_id, identifier).then(response => {
            setBookingRequested(true);
            setSubmittedIdentifier(identifier);
            setBookingConfirmed(true);
            setProcessingRequest(false);
        }).catch(
            error => {
                setBookingConfirmed(false);
                setBookingRequested(true);
                setProcessingRequest(false);
            }
        );
    }

    return(
        bookingRequested
        ? <BookingConfirmation handleClose={props.handleClose} nick={submittedIdentifier} date={props.date}
            bookingConfirmed={bookingConfirmed}
        />
        : <BookingRequest date={props.date} confirmBooking={confirmBooking} handleClose={props.handleClose} 
                            processingRequest={processingRequest}
        />
    )

}