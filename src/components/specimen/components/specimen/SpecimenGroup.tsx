/* Import Dependencies */
import parse from 'html-react-parser';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimenAnnotations, setSpecimenMidsProperty } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'global/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    propertyGroup: string,
    properties: Dict,
    active: boolean,
    TogglePropertyGroup: Function,
    ToggleModal: Function
};


const SpecimenGroup = (props: Props) => {
    const { propertyGroup, properties, active, TogglePropertyGroup, ToggleModal } = props;

    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);

    /* ClassName for property group */
    const classPropertyGroup = classNames({
        'specimen_propertyGroup': true,
        'active': active
    });

    /* ClassName for toggle chevron */
    const classToggleChevron = classNames({
        'specimen_toggleChevron': true,
        'active': active
    });

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-4 border-l-1-primary">
                <Row>
                    <Col md={{ span: 4 }} className="annotate_annotateSectionTitle fw-bold border-dark border-bottom"
                        onClick={() => TogglePropertyGroup(propertyGroup)}
                    >
                        {propertyGroup + ' data'}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`${classToggleChevron} ms-2`}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 12 }} className={`${classPropertyGroup} overflow-hidden`}>
                        <Row>
                            {Object.keys(properties).map((property: string, i) => {
                                const propertyData: Dict = properties[property];

                                return (
                                    <Col key={property} md={{ span: 6 }} className="specimen_propertyBlock py-1">
                                        <Row className="h-100">
                                            <Col md={{ span: 8 }} className="specimen_property"
                                                onClick={() => ToggleModal(property)}
                                            >
                                                <span className="fst-italic">
                                                    {propertyData['displayName'] + ': '}
                                                </span>

                                                {(typeof propertyData['value'] === 'string') &&
                                                    propertyData['value'].includes('<a') ?
                                                    <span className="c-primary"> {parse(propertyData['value'])} </span>
                                                    : propertyData['value']
                                                }
                                            </Col>

                                            {propertyData['mids'] ?
                                                <Col md={{ span: 2, offset: 1 }}
                                                    className="specimen_midsIndication bg-green text-white text-center fw-bold"
                                                    onClick={() =>
                                                        dispatch(setSpecimenMidsProperty(property))
                                                    }
                                                >
                                                    MIDS {propertyData['mids']['level']}
                                                </Col>
                                                : <Col md={{ span: 2, offset: 1 }} />
                                            }

                                            {property in specimenAnnotations &&
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

export default SpecimenGroup;