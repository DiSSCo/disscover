import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const SpecimenInfo = (props) => {
    const specimen = props.specimen;

    if (!specimen['auth']['ods:institutionCode']) {
        if (specimen['unmapped']['providername']) {
            specimen['auth']['ods:institutionCode'] = specimen['unmapped']['providername'];
        }
    }

    const [showVersionLabels, setShowVersionLabels] = useState();

    function ToggleVersionLabels() {
        if (!showVersionLabels) {
            setShowVersionLabels('active');
        } else {
            setShowVersionLabels('');
        }
    }

    return (
        <Row>
            <Col md={{ span: 11 }} className="specimen_rightTitleBlock">
                <Row>
                    <Col md={{ span: 1 }} className="specimen_basisOfRecordSymbolBlock">
                        <i className="icon">
                            <FontAwesomeIcon icon={faFrog} />
                        </i>
                    </Col>
                    <Col md={{ span: 11 }} className="specimen_titleBlock">
                        <h2 className="specimen_title"> {specimen['auth']['ods:name']} </h2>
                    </Col>
                </Row>
            </Col>

            <Col md={{ span: 2 }} className="position-absolute mt-5">
                <Row className="position-relative specimen_versionLabelRow">
                    <div className={"position-absolute specimen_versionTab " + showVersionLabels} onClick={() => ToggleVersionLabels()}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={"specimen_versionTabIcon " + showVersionLabels}
                        />
                        <span className="ps-1 specimen_versionTabTitle"> Versions</span>
                    </div>
                </Row>
                <Row className="position-relative specimen_versionLabelRow">
                    <div className={"px-3 position-absolute specimen_versionLabel " + showVersionLabels}>
                        Original
                    </div>
                </Row>
                <Row className="position-relative specimen_versionLabelRow">
                    <div className={"px-3 position-absolute specimen_versionLabel " + showVersionLabels}>
                        Preferred
                    </div>
                </Row>
                <Row className="position-relative specimen_versionLabelRow">
                    <div className={"px-3 position-absolute specimen_versionLabel " + showVersionLabels}>
                        Other
                    </div>
                </Row>
            </Col>

            <Col md={{ span: 11 }} className="specimen_rightContentBlock">
                <Row className="specimen_mainDetailsBlock">
                    <Col md={{ span: 6 }}>
                        <Row className="h-100">
                            <Col md={{ span: 11, offset: 1 }} className="specimen_detailSpecimen px-3 pt-2">
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        <p className="specimen_detailTitle"> Specimen information </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 6 }}>
                                        <p> Specimen type: </p>
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        <p> {specimen['auth']['ods:materialType'] ? specimen['auth']['ods:materialType'] : 'Unknown'} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 6 }}>
                                        <p> Country: </p>
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        <p> {specimen['unmapped']['country'] ? specimen['unmapped']['country'] : 'Unknown'} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 6 }}>
                                        <p> Locality: </p>
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        <p> {specimen['unmapped']['locality'] ? specimen['unmapped']['locality'] : specimen['unmapped']['area_name']} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <Row className="h-100">
                            <Col md={{ span: 11 }} className="specimen_detailOrganisation px-3 pt-2">
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        <p className="specimen_detailTitle"> Publishing organisation information </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 4 }}>
                                        <p> Publisher: </p>
                                    </Col>
                                    <Col md={{ span: 8 }}>
                                        <p> {specimen['auth']['ods:institutionCode'] ? specimen['auth']['ods:institutionCode'] : 'Unknown'} </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 4 }}>
                                        Country:
                                    </Col>
                                    <Col md={{ span: 8 }}>
                                        <p> {specimen['unmapped']['datasourcecountry'] ? specimen['unmapped']['datasourcecountry'] : 'Unknown'} </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={{ span: 11 }} className="position-relative">
                <Row>
                    <Col md={{ span: 12 }}>
                        <Row>
                            <Col md={{ span: 11 }} className="specimen_detailLinks position-absolute bottom-0 mb-4 pt-3">
                                <Row>
                                    <Col className="col-md-auto">
                                        Source URL:
                                    </Col>
                                    <Col>
                                        {specimen['unmapped']['datasourceurl']}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-md-auto">
                                        Provider URL:
                                    </Col>
                                    <Col>
                                        {specimen['unmapped']['providerurl']}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default SpecimenInfo;