import { Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons';


const AnnotateRow = (props) => {
    const specimenGroup = props.specimenGroup;
    const group = props.group;
    const toggledAnnotationRows = props.toggledAnnotationRows;
    const modalAnnotations = props.modalAnnotations;

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-4 border-l-1-primary">
                <Row>
                    <Col md={{ span: 4 }} className="annotate_annotateSectionTitle border-dark border-bottom" onClick={() => props.ToggleAnnotationRow(group)}>
                        {group + ' data'}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`ms-2 annotate_annotateSectionTitleIcon ${toggledAnnotationRows[group]}`}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }} className={`annotate_annotateSectionRow overflow-hidden ${toggledAnnotationRows[group]}`}>
                        <Row>
                            {Object.keys(specimenGroup).map((key, i) => {
                                const specimenProperty = specimenGroup[key];

                                return (
                                    <Col key={key} md={{ span: 6 }} className="annotate_annotateItem py-1">
                                        <Row className="h-100">
                                            <Col md={{ span: 8 }} className="annotate_annotateProperty"
                                                onClick={() => props.ToggleModal(specimenProperty, key)}
                                                key={specimenProperty['group'] + i.toString()}
                                            >
                                                <span className="fst-italic">
                                                    {specimenProperty['displayName'] + ': '}
                                                </span>

                                                {(typeof specimenProperty['value'] === 'string') &&
                                                    specimenProperty['value'].includes('<a') ?
                                                    <span className="c-primary"> {parse(specimenProperty['value'])} </span>
                                                    : specimenProperty['value']
                                                }
                                            </Col>

                                            {specimenProperty['mids'] ?
                                                <Col md={{ span: 2, offset: 1 }}
                                                    className="annotate_annotateIndication bg-green text-white text-center fw-bold"
                                                    onClick={() =>
                                                        props.UpdateScrollToMids('midsHandle_' + key)
                                                    }
                                                >
                                                    MIDS {specimenProperty['mids']['level']}
                                                </Col>
                                                : <Col md={{ span: 2, offset: 1 }} />
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