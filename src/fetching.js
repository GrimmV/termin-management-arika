
const base_url = "https://termin-management-default-rtdb.europe-west1.firebasedatabase.app/"

export const getPossibleTimes = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_url + "moeglicheTermine.json", requestOptions)
    .then(response => response.json())
    .catch(e => console.log('error', e));
}

export const reserveTime = (timeId, nutzer) => {
    var urlencoded1 = new URLSearchParams();
    urlencoded1.append("timeId", timeId);

    var urlencoded2 = new URLSearchParams();
    urlencoded2.append("timeId", timeId);
    urlencoded2.append("nutzer", nutzer);

    var requestOptions1 = {
        method: 'PUT',
        body: JSON.stringify({
            "timeId": timeId
        }),
        redirect: 'follow'
    };

    var requestOptions2 = {
        method: 'PUT',
        body: JSON.stringify({
            "timeId": timeId,
            "nutzer": nutzer
        }),
        redirect: 'follow'
        };

    return fetch(base_url + "geschlosseneTermine.json", requestOptions1)
    .then(response => {return response.json()})
    .then(newResp => {
        return fetch(base_url + "nutzer.json", requestOptions2)
        .then(newestResp => {
            return newestResp.json();
        })
    })
    .catch(error => console.log('error', error));
}