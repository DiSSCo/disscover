/* Import Depenencies */
import { useRef } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Components */
import MidsDetailsRow from './MidsDetailsRow';


/* Props Typing */
interface Props {
    active: Boolean,
    specimen: Dict
};


const MidsDetails = (props: Props) => {
    const { active, specimen } = props;

    /* ClassName for MIDS details */
    const classMidsDetails = classNames({
        'specimen_midsDetailsBlock': true,
        'active': active
    });

    /* Ref to MIDS details */
    const refMidsDetails = useRef<HTMLDivElement>(null);

    /* Function for scrolling to MIDS property, if MIDS ref is defined */
    const ScrollToMids = (midsRef: React.RefObject<HTMLDivElement>) => {
        if (refMidsDetails.current && midsRef.current) {
            refMidsDetails.current.scrollTop = midsRef.current.offsetTop;
        }
    }

    return (
        <Col md={{ span: 12 }} className="position-relative">
            <div className={`${classMidsDetails} position-absolute w-100 overflow-hidden`}>
                <Row className="h-100 m-3">
                    <Col md={{ span: 12 }} className="h-100">
                        <Row>
                            <Col md={{ span: 12 }} className="specimen_midsDetailsBlockTitle">
                                MIDS indications
                            </Col>
                        </Row>
                        <Row className="h-100">
                            <Col md={{ span: 12 }} className="specimen_midsDetailsSections overflow-scroll position-relative"
                                ref={refMidsDetails}
                            >
                                {Object.keys(specimen).map((propertyGroup) => {
                                    return (
                                        <MidsDetailsRow
                                            key={propertyGroup}
                                            propertyGroup={propertyGroup}
                                            properties={specimen[propertyGroup]}

                                            ScrollToMids={(midsRef: React.RefObject<HTMLDivElement>) => ScrollToMids(midsRef)}
                                        />
                                    );
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default MidsDetails;