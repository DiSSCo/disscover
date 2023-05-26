/* Import Dependencies */
import { CheckProperty } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: Specimen
};


const TaxonomyExt = (props: Props) => {
    const { specimen} = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faDiamond} />
                    <span className="ms-1"> Taxonomy </span>
                </h5>

                <p className={styles.IDCardProperty}>
                    <span className="fw-bold"> Kingdom: </span>
                    {CheckProperty(specimen.data['dwc:kingdom'])}
                </p>
                <p className={`${styles.IDCardProperty} mt-2`}>
                    <span className="fw-bold"> Phylum: </span>
                    {CheckProperty(specimen.data['dwc:phylum'])}
                </p>
                <p className={`${styles.IDCardProperty} mt-2`}>
                    <span className="fw-bold"> Order: </span>
                    {CheckProperty(specimen.data['dwc:order'])}
                </p>
                <p className={`${styles.IDCardProperty} mt-2`}>
                    <span className="fw-bold"> Family: </span>
                    {CheckProperty(specimen.data['dwc:family'])}
                </p>
                <p className={`${styles.IDCardProperty} mt-2`}>
                    <span className="fw-bold"> Genus: </span>
                    {CheckProperty(specimen.data['dwc:genus'])}
                </p>
            </Col>
        </Row>
    );
}

export default TaxonomyExt;