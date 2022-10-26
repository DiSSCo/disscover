import axios from 'axios';

/* Temporary import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


function GetDigitalMedias(callback) {
    const endPoint = `digitalmedia`;

    axios({
        method: "get",
        url: endPoint,
        params: {
            pageSize: 16
        },
        responseType: 'json'
    }).then(function (result) {
        let test = [];

        // for (const i in result['data']) {
        //     const digitalMedia = result['data'][i];

        //     GetSpecimen(digitalMedia['digitalSpecimenId'], Process);

        //     function Process(specimen) {
        //         digitalMedia['specimen'] = specimen;
        //         test.push(digitalMedia);

        //         if (i == 9) {
        //             callback(test);
        //         }
        //     }
        // }

        callback(result['data']);
    }).catch(error => {
        /* To be replaced by logger */
        console.warn(error);
    });
}

export default GetDigitalMedias;