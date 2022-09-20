import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetRecentSpecimens from 'api/specimen/GetRecentSpecimens';


const RecentAnnotations = () => {
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

                        if (!(i % 2 === 0)) {
                            rowClass = 'even';
                        }

                        return (
                            <Row>
                                <Col md={{ span: 10 }} className={`recentAnnotation my-2 ${rowClass}`}>
                                    <Row>
                                        <Col>
                                            {specimen['specimenName']}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        );

                    })}
                </Col>
            </Row>
        );
    }
}

export default RecentAnnotations;