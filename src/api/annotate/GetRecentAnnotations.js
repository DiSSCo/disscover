import axios from "axios";

/* Temporary solution */
import GetSpecimen from "api/specimen/GetSpecimen";


function GetRecentAnnotations(callback) {
    const endPoint = "/annotations/latest"

    axios({
        method: "get",
        url: endPoint,
        responseType: 'json'
    }).then(function (result) {
        /* Temporary solution */
        let test = [];

        for (const i in result['data']) {
            const annotation = result['data'][i];

            GetSpecimen(annotation['target']['id'].replace("https://hdl.handle.net/", ""), Process);

            function Process(specimen) {
                annotation['specimen'] = specimen;

                test.push(annotation);

                if (i == 9) {
                    callback(test);
                }
            }
        }
    }).catch(error => {
        /* To be replaced by logger */
        console.warn(error);
    });
}

export default GetRecentAnnotations;