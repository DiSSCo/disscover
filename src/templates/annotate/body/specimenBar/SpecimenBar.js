import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import components */
import MidsDetails from '../midsDetails/MidsDetails';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog, faComment, faPencil, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const SpecimenBar = (props) => {
    const specimen = props.specimen;
    const mids = props.mids;
    const midsDetailsVisibility = props.midsDetailsVisibility;
    const scrollToMids = props.scrollToMids;
    
    let mode = props.mode;

    function SetMode(mode) {
        props.SetMode(mode);
    }

    return (
        <Row className="h-100 annotate_specimenBar">
            <Col md={{ span: 5 }}>
                <Row className="h-50">
                    <Col md={{ span: 1 }} className="annotate_basisOfRecordSymbolBlock">
                        <i className="icon">
                            <FontAwesomeIcon icon={faFrog} />
                        </i>
                    </Col>
                    <Col md={{ span: 11 }} className="annotate_titleBlock">
                        {specimen['Specimen']['name']['value']}
                    </Col>
                </Row>
                <Row className="h-50">
                    <Col md={{ span: 12 }} className="annotate_annotateBlocks">
                        <Row>
                            {mode === 'annotate' ?
                                <Col md={{ span: 3 }} className="annotate_annotateBlock active">
                                    Annotate
                                    <FontAwesomeIcon icon={faComment} className="ps-2" />
                                </Col>
                                : <Col md={{ span: 3 }} className="annotate_annotateBlock" onClick={() => SetMode('annotate')}>
                                    Annotate
                                    <FontAwesomeIcon icon={faComment} className="ps-2" />
                                </Col>
                            } {mode === 'curate' ?
                                <Col md={{ span: 3 }} className="annotate_annotateBlock curate active">
                                    Curate
                                    <FontAwesomeIcon icon={faPencil} className="ps-2" />
                                </Col>
                                : <Col md={{ span: 3 }} className="annotate_annotateBlock" onClick={() => SetMode('curate')}>
                                    Curate
                                    <FontAwesomeIcon icon={faPencil} className="ps-2" />
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={{ span: 6, offset: 1 }}>
                <Row className="h-100">
                    <Col md={{ span: 7 }} className="annotate_midsMeterBlock">
                        <Row>
                            <Col md={{ span: 8, offset: 1 }}>
                                Completion level (MIDS)
                            </Col>
                            <Col md={{ span: 2 }} className="annotate_midsMeterTitleRight">
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    onClick={() => props.ToggleMidsDetails()}
                                    className={"annotate_midsMeterChevronDown " + midsDetailsVisibility}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="annotate_midsMeterBar">
                                Lv {specimen['Meta']['midsLevel']['value']}.
                            </Col>
                        </Row>
                    </Col>


                    <MidsDetails 
                        visibility={midsDetailsVisibility}
                        specimen={specimen}
                        scrollToMids={scrollToMids}
                    />

                </Row>
            </Col>
        </Row>
    );
}

export default SpecimenBar;