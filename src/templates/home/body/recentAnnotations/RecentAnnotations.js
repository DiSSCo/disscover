import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetRecentAnnotations from 'api/annotate/GetRecentAnnotations';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


const RecentAnnotations = () => {
    const [recentAnnotations, setRecentAnnotations] = useState();

    useEffect(() => {
        if (!recentAnnotations) {
            GetRecentAnnotations(Process);

            function Process(annotations) {
                setRecentAnnotations(annotations);
            }
        }
    }, []);

    const [backgroundHover, setBackgroundHover] = useState({});

    if (recentAnnotations) {
        return (
            <Row className="mt-5 position-relative">
                <Col>
                    <Row className="mt-5">
                        <Col md={{ span: 12 }}>
                            <div className="home_fullWidthBackground position-absolute bg-backdrop" />

                            <div className="position-relative">
                                <Row>
                                    <Col>
                                        <h4 className="text-white">
                                            Recently Annotated
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="px-2">
                                    <Col md={{ span: 12 }}>
                                        <Row>
                                            {recentAnnotations.map((annotation, i) => {
                                                if (!annotation['specimen']['specimenName']) {
                                                    annotation['specimen']['specimenName'] = 'Undefined name';
                                                }

                                                return (
                                                    <Col key={i} md={{ span: 6 }} className="my-2">
                                                        <Row>
                                                            <Col md={{ span: 10 }}
                                                                className="position-relative bg-white overflow-hidden"
                                                                onMouseEnter={() => setBackgroundHover({ [i]: 'active' })}
                                                                onMouseLeave={() => setBackgroundHover({})}
                                                            >
                                                                <Link to={`/ds/${annotation['specimen']['id']}`}>
                                                                    <Row className="py-2 position-relative z-1">
                                                                        <Col md={{ span: 10 }}>
                                                                            <Row>
                                                                                <Col md={{ span: 12 }} className="recentAnnotationTitle fw-bold">
                                                                                    {annotation['specimen']['specimenName']}
                                                                                </Col>
                                                                                <Col md={{ span: 12 }}>
                                                                                    {`${annotation['target']['indvProp']}`} was annoted by: Username
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col md={{ span: 2 }} className="position-relative">
                                                                            <div className={`recentAnnotationGoText ${backgroundHover[i]}`}> Go </div>
                                                                        </Col>
                                                                    </Row>

                                                                    <FontAwesomeIcon icon={faBug} 
                                                                        className={`recentAnnotationIcon position-absolute z-0 ${backgroundHover[i]}`} 
                                                                    />
                                                                    <div className={`recentAnnotationBackground ${backgroundHover[i]}`} />
                                                                    <div md={{ span: 2 }} className={`position-absolute recentAnnotationGo ${backgroundHover[i]}`} />
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                );

                                            })}
                                        </Row>
                                        <Row className="mt-4">
                                            <Col className="col-md-auto border border-2 rounded-c border-white text-white recentAnnotationOverviewButton">
                                                <Link to='/annotate'>
                                                    <div>
                                                        Go to Annotation Overview
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default RecentAnnotations;