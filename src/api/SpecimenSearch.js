import $ from 'jquery';

function SpecimenSearch(query, callback) {
    if (query) {
        const endPoint = "api/v1/specimen/search";
        const params = {
            query: "'" + query + "'",
            pageSize: 20
        }

        $.ajax({
            method: "GET",
            url: endPoint,
            contentType: "application/json",
            data: params,
            success: function (result) {
                callback(result);
            }
        });
    }
}

export default SpecimenSearch