import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import components */
import SpecimenBar from "./specimenBar/SpecimenBar";
import AnnotateSection from './annotateSection/AnnotateSection';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';


const Body = (props) => {
    const specimen = props.specimen;
    const mids = props.mids;

    useEffect(() => {
        if (mids) {
            ToggleMidsDetails();
        }
    }, []);

    const [mode, setMode] = useState(props.mode);

    function SetMode(chosenMode) {
        setMode(chosenMode);
    }

    const [midsDetailsVisibility, setMidsDetailsVisibility] = useState('hidden');

    function ToggleMidsDetails() {
        if (midsDetailsVisibility) {
            setMidsDetailsVisibility('');
        } else {
            setMidsDetailsVisibility('hidden');
        }
    }

    const [scrollToMids, setScrollToMids] = useState();

    function UpdateScrollToMids(midsHandle) {
        if (midsDetailsVisibility) {
            ToggleMidsDetails();
        }

        setTimeout(function () {
            setScrollToMids(midsHandle);
        }, 400)
    }

    if (specimen) {
        return (
            <Container fluid>
                <Row className="annotate_content mt-4">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <Row>
                            <Link to={'/ds/' + specimen['Meta']['id']['value']} state={{ specimen: specimen }}>
                                <Col className="annotate_returnTo">
                                    Return to overview
                                    <FontAwesomeIcon icon={faArrowTurnDown} className="annotate_returnToIcon ms-2" />
                                </Col>
                            </Link>
                        </Row>

                        <Row>
                            <Col md={{ span: 12 }} className="annotate_specimenBarBlock pb-4 mt-3">
                                <Row>
                                    <Col md={{ span: 12 }} className="annotate_specimenBar">
                                        <SpecimenBar
                                            specimen={specimen}
                                            mode={mode}
                                            midsDetailsVisibility={midsDetailsVisibility}
                                            scrollToMids={scrollToMids}

                                            SetMode={(chosenMode) => SetMode(chosenMode)}
                                            ToggleMidsDetails={() => ToggleMidsDetails()}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="annotate_annotationSections">
                            <Col md={{ span: 12 }}>
                                <AnnotateSection
                                    specimen={specimen}

                                    UpdateScrollToMids={(midsHandle) => UpdateScrollToMids(midsHandle)}
                                    ToggleMidsDetails={() => ToggleMidsDetails()}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default Body;