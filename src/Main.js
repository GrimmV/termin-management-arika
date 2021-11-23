import React, { useEffect, useState } from 'react';
import {Paper, List, Typography} from '@mui/material';
import ListItemComponent from './ListItemComponent';
import { getPossibleTimes } from './fetching';


export default function Main() {

    const [offeneTermine, setOffeneTermine] = useState({});

    useEffect(() => {
        resetOffeneTermine();
    }, [])

    const resetOffeneTermine = () => {
        getPossibleTimes().then(response => {
            setOffeneTermine(response);
        })
    }

    const createListItems = () => {
        const items = [];
        for (let terminKey in offeneTermine) {
            items.push(
                <ListItemComponent key={terminKey} termin={new Date(offeneTermine[terminKey])} termin_id={terminKey}
                    resetOffeneTermine={resetOffeneTermine}
                />
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