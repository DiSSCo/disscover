/* Import Dependencies */
import { CheckProperty } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: Specimen
};


const OrganisationExt = (props: Props) => {
    const { specimen } = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faLandmark} />
                    <span className="ms-1"> Organisation </span>
                </h5>

                <p className="fs-4">
                    <span className="fw-bold"> Name: </span>
                    {CheckProperty(specimen.data['ods:organisationName'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> ROR identifier: </span>
                    {specimen.organisationId.replace('https://ror.org/', '')}
                </p>
            </Col>
        </Row>
    );
}

export default OrganisationExt;