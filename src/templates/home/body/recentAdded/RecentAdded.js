import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetRecentSpecimens from 'api/specimen/GetRecentSpecimens';

/* Import icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


const RecentAdded = () => {
    const [recentSpecimens, setRecentSpecimens] = useState();

    useEffect(() => {
        GetRecentSpecimens(Process);

        function Process(specimens) {
            setRecentSpecimens(specimens);
        }
    }, []);

    if (recentSpecimens) {
        return (
            <Row className="px-2">
                <Col>
                    {recentSpecimens.map((specimen, i) => {
                        if (!specimen['specimenName']) {
                            specimen['specimenName'] = 'Undefined name';
                        }

                        let rowClass = '';

                        if (i % 2 !== 0) {
                            rowClass = 'even';
                        }

                        return (
                            <Row>
                                <Col md={{ span: 10 }} className={`recentAddedSpecimen my-2 position-relative ${rowClass}`}>
                                    {/* <Row>
                                        <Col>
                                            13-05-2022
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col>
                                            {specimen['specimenName']}
                                        </Col>
                                    </Row>

                                    <FontAwesomeIcon icon={faBug} className="recentAddedSpecimenIcon" />
                                </Col>
                            </Row>
                        );

                    })}
                </Col>
            </Row>
        );
    }
}

export default RecentAdded;