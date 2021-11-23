
const base_url = "https://termin-management-default-rtdb.europe-west1.firebasedatabase.app/"

export const getPossibleTimes = () => {
    
    return getMoeglicheTermine().then(
        moeglicheTermine => {
            return getGeschlosseneTermine().then(
                geschlosseneTermine => {
                    let offeneTermine = {};
                    for (let mTermin in moeglicheTermine) {
                        let geschlossen = false;
                        for (let gTermin in geschlosseneTermine) {
                            if (mTermin === geschlosseneTermine[gTermin]["timeId"]) {
                                geschlossen = true;
                            }
                        }
                        if (!geschlossen) {
                            offeneTermine[mTermin] = JSON.parse(JSON.stringify(moeglicheTermine[mTermin]["datum"]));
                        }
                    }
                    return offeneTermine;
                }
            )
        }
    )
}

const getMoeglicheTermine = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_url + "moeglicheTermine.json", requestOptions)
    .then(response => response.json())
}

const getGeschlosseneTermine = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_url + "geschlosseneTermine.json", requestOptions)
    .then(response => response.json())
}

export const reserveTime = (timeId, nutzer) => {

    return checkIfTerminVergeben(timeId)
    .then(terminVergeben => {
        if (!terminVergeben) saveGeschlosseneTermine(timeId)
    })
    .then(() => saveNutzer(timeId, nutzer));
}

const saveGeschlosseneTermine = (timeId) => {
    
    var requestOptions1 = {
        method: 'POST',
        body: JSON.stringify({
                "timeId": timeId
        }),
        redirect: 'follow'
    };

    return fetch(base_url + "geschlosseneTermine.json", requestOptions1)
    .then(response => {return response.json()})
}

const saveNutzer = (timeId, nutzer) => {


    var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            "timeId": timeId,
            "nutzer": nutzer
        }),
        redirect: 'follow'
        };

    return fetch(base_url + "nutzer.json", requestOptions)
        .then(response => {
            return response.json();
    })
}

const checkIfTerminVergeben = (timeId) => {

    return fetch(base_url + "geschlosseneTermine.json").then(
        response => {
            console.log(response);
            if (response !== null) {
                return response.json();
            } else {
                return false;
            }
        }
    ).then(response => {
        console.log(response);
        for (let value in response) {
            if (timeId === response[value]["timeId"]){
                throw Error("Termin nicht verfügbar");}
        }
        return false;
    })
}

