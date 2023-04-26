/* Import Dependencies */
import { createRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenMidsProperty } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    propertyGroup: string,
    properties: Dict,
    ScrollToMids: Function
};


const MidsDetailsRow = (props: Props) => {
    const { propertyGroup, properties, ScrollToMids } = props;

    /* Base Variables */
    const midsProperty = useAppSelector(getSpecimenMidsProperty);
    const midsRefs: Dict = {};
    const midsProperties: JSX.Element[] = [];

    /* For each property, check if MIDS level is defined, if so return */
    Object.keys(properties).forEach((property: string) => {
        const propertyData: Dict = properties[property];

        if (propertyData['mids']) {
            /* Create ref for MIDS property */
            midsRefs[property] = createRef();

            /* Push to be rendered in view */
            midsProperties.push(
                <Row key={property} className="py-1" ref={midsRefs[property]}>
                    <Col md={{ span: 12 }}>
                        <Row>
                            <Col md={{ span: 6 }} className="textOverflow">
                                {propertyData.displayName}
                            </Col>
                            <Col md={{ span: 3 }} className="specimen_midsDetailsIndication bg-green fw-bold text-white text-center">
                                MIDS {propertyData.mids.level}
                            </Col>
                            <Col md={{ span: 3 }}>
                                Details
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }
    });

    /* If specimen MIDS property is defined, scroll to */
    useEffect(() => {
        if (midsProperty in midsRefs) {
            ScrollToMids(midsRefs[midsProperty]);
        }
    }, [midsProperty]);

    return (
        <Row>
            <Col md={{ span: 12 }} className="ms-3 mt-3 mb-3 specimen_midsDetailsSection">
                <Row>
                    <Col className="col-md-auto specimen_midsDetailsSectionTitle">
                        {propertyGroup}
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }} className="specimen_midsDetailsSectionContent">
                        {midsProperties}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MidsDetailsRow;