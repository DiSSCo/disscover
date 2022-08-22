import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import components */
import SpecimenBar from "./specimenBar/SpecimenBar";
import AnnotateSection from './annotateSection/AnnotateSection';


const Body = (props) => {
    const specimen = props.specimen;
    const mids = props.mids;

    console.log(specimen)

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
                <Row className="annotate_content">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <Row>
                            <Col md={{ span: 12 }} className="pb-4 annotate_specimenBarBlock">
                                <Row>
                                    <Col md={{ span: 12 }} className="annotate_specimenBar">
                                        <SpecimenBar
                                            specimen={specimen}
                                            mode={mode}
                                            mids={mids}
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