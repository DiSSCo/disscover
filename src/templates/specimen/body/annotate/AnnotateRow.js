import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons';


const AnnotateRow = (props) => {
    const specimenGroup = props.specimenGroup;
    const group = props.group;
    const toggledAnnotationRows = props.toggledAnnotationRows;
    const modalAnnotations = props.modalAnnotations;

    console.log(modalAnnotations);

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-4 annotate_annotateSection">
                <Row>
                    <Col md={{ span: 4 }} className="annotate_annotateSectionTitle" onClick={() => props.ToggleAnnotationRow(group)}>
                        {group + ' data'}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`ms-2 annotate_annotateSectionTitleIcon ${toggledAnnotationRows[group]}`}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }} className={`annotate_annotateSectionRow ${toggledAnnotationRows[group]}`}>
                        <Row>
                            {Object.keys(specimenGroup).map((key, i) => {
                                const specimenProperty = specimenGroup[key];
                                
                                return (
                                    <Col key={key} md={{ span: 6 }} className="annotate_annotateItem">
                                        <Row>
                                            <Col md={{ span: 8 }} className="annotate_annotateProperty"
                                                onClick={() => props.ToggleModal(key, specimenProperty['displayName'], specimenProperty['value'])} key={specimenProperty['group'] + i.toString()}>
                                                <span className="annotate_annotatePropertyName">
                                                    {specimenProperty['displayName'] + ': '}
                                                </span>
                                                {specimenProperty['value']}
                                            </Col>

                                            {specimenProperty['mids'] &&
                                                <Col md={{ span: 2, offset: 1 }}
                                                    className="annotate_annotateIndication"
                                                    onClick={() =>
                                                        props.UpdateScrollToMids('midsHandle_' + key)
                                                    }
                                                >
                                                    MIDS {specimenProperty['mids']['level']}
                                                </Col>
                                            }

                                            {modalAnnotations[key] &&
                                                <Col md={{ span: 1 }}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </Col>
                                            }
                                        </Row>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AnnotateRow;