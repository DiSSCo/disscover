/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Annotation, Specimen, DigitalMedia, Dict } from 'global/Types';

/* Import API */
import GetRecentAnnotations from 'api/annotate/GetRecentAnnotations';
import GetSpecimen from 'api/specimen/GetSpecimen';
import GetDigitalMedia from 'api/digitalMedia/GetDigitalMedia';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


const RecentAnnotations = () => {
    const [recentAnnotations, setRecentAnnotations] = useState<Annotation[]>([]);

    useEffect(() => {
        GetRecentAnnotations(10).then((annotations) => {
            let counter = 0;

            const CheckCounter = () => {
                if (counter >= 10) {
                    setRecentAnnotations(annotations);
                }
            }

            annotations.forEach((annotation, index) => {
                GetAnnotationTarget(annotation).then((target) => {
                    if (target) {
                        if (annotation.target.type === 'digital_specimen') {
                            annotations[index].specimen = target as Specimen;

                            counter++;

                            CheckCounter();
                        } else if (annotation.target.type === 'digital_media') {
                            annotations[index].digitalMedia = target as DigitalMedia;

                            counter++;

                            CheckCounter();
                        }
                    }
                });
            });
        });
    }, []);

    /* Function for fetching Specimen or Digital Media belonging to Annotation */
    const GetAnnotationTarget = async (annotation: Annotation) => {
        let target = {} as Specimen | DigitalMedia;

        if (annotation.target.type === 'digital_specimen') {
            await GetSpecimen(annotation.target.id.replace('https://hdl.handle.net/', '')).then((specimen) => {
                if (specimen) {
                    target = specimen;
                }
            });
        } else if (annotation.target.type === 'digital_media') {
            await GetDigitalMedia(annotation.target.id.replace('https://hdl.handle.net/', '')).then((digitalMedia) => {
                if (digitalMedia) {
                    target = digitalMedia;
                }
            });
        }

        return target;
    }

    const [backgroundHover, setBackgroundHover] = useState<Dict>({});

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
                                                const targetPage = (annotation.target.type === 'digital_specimen') ? 'ds' :
                                                    (annotation.target.type === 'digital_media') && 'dm';

                                                const targetName = annotation.specimen ? annotation.specimen.specimenName :
                                                    annotation.digitalMedia && annotation.digitalMedia.mediaUrl;

                                                return (
                                                    <Col key={annotation.id} md={{ span: 6 }} className="my-2">
                                                        <Row>
                                                            <Col md={{ span: 10 }}
                                                                className="position-relative bg-white overflow-hidden"
                                                                onMouseEnter={() => setBackgroundHover({ [i]: 'active' })}
                                                                onMouseLeave={() => setBackgroundHover({})}
                                                            >
                                                                <Link to={`/${targetPage}/${annotation['target']['id'].replace('https://hdl.handle.net/', '')}`}>
                                                                    <Row className="py-2 position-relative z-1">
                                                                        <Col md={{ span: 10 }}>
                                                                            <Row>
                                                                                <Col md={{ span: 12 }} className="recentAnnotationTitle fw-bold">
                                                                                    {targetName}
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
                                                                    <div className={`position-absolute recentAnnotationGo ${backgroundHover[i]}`} />
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
    } else {
        return (
            <> </>
        );
    }
}

export default RecentAnnotations;