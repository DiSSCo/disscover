import $ from 'jquery';
import axios from 'axios';

function SpecimenSearch(query, callback) {


    if (query) {
        const endPoint = "https://temp-sandbox.dissco.tech/api/v1/specimen/search?query='saurus'";
        const params = {
            query: "'" + query + "'"
        }

        // fetch(endPoint, {
        //     method: 'GET',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
            
        // }).then(res => res.json()).then((result) => {
        //     console.log(result);
        // });

        // $.ajax({
        //     method: "GET",
        //     url: endPoint,
        //     // contentType: "application/json",
        //     // data: params,
        //     success: function (result) {
        //         callback(result);
        //     }
        // });

        // fetch(endPoint).then(res => res.json()).then((result) => {
        //     console.log(result);
        // })

        axios.get(endPoint)
            .then(res => {
                console.log(res);
            })
    }
}

export default SpecimenSearch