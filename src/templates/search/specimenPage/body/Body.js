import { Row, Col } from 'react-bootstrap';

const Body = (props) => {
    const specimen = props.specimen['ods:authoritative'];

    console.log(specimen);

    return (
        <>
            <h1>
                {specimen['ods:name']}
            </h1>
            <h2>
                {specimen['ods:institutionCode']}
            </h2>
            <h3>
                {specimen['ods:materialType']}
            </h3>
        </>
    );
}

export default Body;