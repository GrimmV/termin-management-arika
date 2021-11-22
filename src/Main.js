import React, { useEffect, useState } from 'react';
import {Paper, List, Typography} from '@mui/material';
import ListItemComponent from './ListItemComponent';

const dummy_data = {
    "moeglicheTermine": {
        "Mp6FK5n9nBaE5OheNTy":{"datum":"2021-11-27T12:00:00"},
        "Mp6FK5nAoCbF6PifOUy":{"datum":"2021-11-27T13:00:00"},
        "Mp6FK5nBpDcG7QjgPVy":{"datum":"2021-11-27T14:00:00"},
        "Mp6FK5nCqEdH8RkhQWy":{"datum":"2021-11-27T15:00:00"},
        "Mp6FK5nDrFeI9SliRXy":{"datum":"2021-11-27T16:00:00"},
        "Mp6FK5nEsGfJATmjSYy":{"datum":"2021-11-27T17:00:00"},
        "Mp6FK5nFtHgKBUnkTZy":{"datum":"2021-11-27T18:00:00"}
    },
    geschlosseneTermine: {
        "Mp6eqwdawq": {"terminId": "Mp6FK5n9nBaE5OheNTy"},
        "Mp6eqwdawsdq": {"terminId": "Mp6FK5nBpDcG7QjgPVy"}
    }
}


export default function Main() {

    const [offeneTermine, setOffeneTermine] = useState([]);

    useEffect(() => {
        let data = []
        for (let terminKey in dummy_data["moeglicheTermine"]) {
            if (checkIfTerminOffen(terminKey, dummy_data["geschlosseneTermine"])) {
                data.push(new Date(dummy_data["moeglicheTermine"][terminKey]["datum"]))
            }
        }
        setOffeneTermine(data);
    }, [])

    const checkIfTerminOffen = (offenerTerminKey, geschlosseneTermine) => {
        for (let terminKey in geschlosseneTermine) {
            if (geschlosseneTermine[terminKey]["terminId"] === offenerTerminKey) return false;
        }
        return true;
    }

    const createListItems = () => {
        const items = [];
        for (let termin of offeneTermine) {
            items.push(
                <ListItemComponent key={Date.parse(termin)} termin={termin}/>
            )
        }
        return items;
    }

    return(
        <Paper elevation={0}>
            <Typography variant="h3">Terminbuchung für Hololens Testcase</Typography>
            <Typography sx={{margin: 2}}>
                Vielen Dank für das Interesse an unserer Evaluation mit der Hololens. 
                Bitte bucht unten einen Termin, an dem ihr Zeit habt, um an der Evaluation teilzunehmen.
            </Typography>
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 2
                }}
            >
            <List
                sx={{display: "block"}}
            >
                {createListItems()}
            </List>
            </Paper>
        </Paper>
    )
}