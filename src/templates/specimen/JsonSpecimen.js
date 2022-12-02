import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

/* Import API */
import GetSpecimen from "api/specimen/GetSpecimen";


const JsonSpecimen = () => {
    const params = useParams();

    const [jsonResponse, setJsonResponse] = useState({});

    useEffect(() => {
        GetSpecimen(params['id'], Process);

        function Process(result) {
            setJsonResponse(result);
        }
    }, []);

    if (jsonResponse) {
        return (
            <div>
                {JSON.stringify(jsonResponse)}
            </div>
        );
    }
}

export default JsonSpecimen;