import axios from 'axios';


function GetSpecimenDigitalMedia(specimen, callback) {
    const handle = specimen['Meta']['id']['value'];

    if (handle) {
        const endPoint = `specimens/${handle}/digitalmedia`;

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        }).then(function (result) {
            callback(result['data'], specimen);
        }).catch(error => {
            /* To be replaced by logger */
            console.warn(error);
        });
    }
}

export default GetSpecimenDigitalMedia;