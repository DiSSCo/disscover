/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { GetAnnotationMotivations } from 'app/utilities/AnnotateUtilities';

/* Import Types */
import { DropdownItem } from 'app/Types';

/* Import Icons */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Dropdown, Tooltip } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    formValues: {
        motivation: string,
        sortBy: string
    },
    SetFieldValue: Function,
    SubmitForm: Function
};


/**
 * Component that renders the sorting filters in the annotation side panel
 * @param formValues The current values of the filter/sort annotations form
 * @param SetFieldValue Function to set the value of a given form field name
 * @param SubmitForm Function to suvmit the filer/sort annotations form
 * @returns JSX Component
 */
const SortingFilters = (props: Props) => {
    const { SetFieldValue, formValues, SubmitForm } = props;

    /* Base variables */
    const annotationMotivations = GetAnnotationMotivations('*');
    const dateSortItems: DropdownItem[] = [
        {
            label: 'Date - latest',
            value: 'dateLatest'
        },
        {
            label: 'Date - oldest',
            value: 'dateOldest'
        }
    ];

    /* Construct dropdown items */
    const annotationMotivationItems: DropdownItem[] = Object.entries(annotationMotivations).map(([motivation, motivationName]) => ({
        label: motivationName,
        value: motivation
    }));
    annotationMotivationItems.unshift({
        label: 'All motivations',
        value: ''
    });

    return (
        <div>
            <Row>
                {/* Annotation motivation */}
                <Col>
                    <Row>
                        <Col lg="auto"
                            className="pe-0"
                        >
                            <p className="fs-4 fw-lightBold">
                                Filter by motivation
                            </p>
                        </Col>
                        <Col className="d-flex align-items-center">
                            <Tooltip text="The reason behind creating an annotation"
                                placement="right"
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    size="sm"
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={annotationMotivationItems}
                                selectedItem={annotationMotivationItems.find(item => item.value === formValues.motivation)}
                                styles={{
                                    border: true,
                                    borderRadius: '999px',
                                    background: '#ffffff'
                                }}
                                OnChange={(item: DropdownItem) => {
                                    SetFieldValue('motivation', item.value);
                                    SubmitForm();
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                {/* Date */}
                <Col>
                    <Row>
                        <Col>
                            <p className="fs-4 fw-lightBold">
                                Sort by
                            </p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={dateSortItems}
                                selectedItem={dateSortItems.find(item => item.value === formValues.sortBy)}
                                styles={{
                                    border: true,
                                    borderRadius: '999px',
                                    background: '#ffffff'
                                }}
                                OnChange={(item: DropdownItem) => {
                                    SetFieldValue('sortBy', item.value);
                                    SubmitForm();
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default SortingFilters;