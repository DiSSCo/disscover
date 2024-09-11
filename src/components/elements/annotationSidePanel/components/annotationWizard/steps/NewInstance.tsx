/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jp from 'jsonpath';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { AnnotationTarget, Dict, DropdownItem } from 'app/Types';

/* Import Icons */
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button, Dropdown } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    annotationTarget?: AnnotationTarget,
    formValues: Dict,
    SetFieldValue?: Function
};

/* Parent class type */
type ParentClass = {
    jsonPath: string,
    name: string,
    parentName?: string,
    present: boolean,
    options?: number
};


/**
 * Component that renders a new, annotatable instance of the selected annotation target in the select instance step of the wizard
 * @param superClass The provided super class
 * @param annotationTarget The annotation target set
 * @param formValues The current values in the annotation wizard form
 * @param SetFieldValue Function to set a value of a field in the form
 * @returns JSX Component
 */
const NewInstance = (props: Props) => {
    const { superClass, annotationTarget, formValues, SetFieldValue } = props;

    /* Class Names */
    // const selectedDivClass = classNames({
    //     'b-primary br-selected': selected
    // });

    console.log(annotationTarget);

    /* Base variables */
    const parentClasses: ParentClass[] = [];

    if (annotationTarget) {
        /* Check for parent classes, they either contain the term 'has' or start with a capital */
        const pathArray: string[] = ['$'];
        const parents = jp.parse(annotationTarget.jsonPath).slice(1, -1);

        parents.forEach((parent, index) => {
            /* Filter path from schemas */
            let parentName = parent.expression.value.replace('ods:', '').replace('dwc:', '').replace('dcterms:', '');

            /* Add to pathArray */
            pathArray.push(parent.expression.value);

            if (parentName.includes('has') || parentName[0] === parentName[0].toUpperCase()) {
                /* If a parent class is empty, it needs to be targeted, if it is not completely empty, check for indexes */
                const parentNodes = jp.nodes(superClass, jp.stringify(pathArray).replace('][', ']..['));

                if (!parentNodes.length) {
                    parentClasses.push({
                        jsonPath: jp.stringify(pathArray),
                        name: MakeJsonPathReadableString(jp.stringify(pathArray)),
                        ...(index > 0 && { parentName: pathArray[index] }),
                        present: false
                    });
                }

                parentNodes.forEach(parentNode => {
                    console.log(parentNode);

                    parentClasses.push({
                        jsonPath: jp.stringify(parentNode.path),
                        name: MakeJsonPathReadableString(jp.stringify(parentNode.path)),
                        ...(index > 0 && { parentName: pathArray[index] }),
                        present: (Array.isArray(parentNode.value) && !!parentNode.value.length) || (!Array.isArray(parentNode.value) && typeof (parentNode.value) === 'object'),
                        ...(parentNode.value.length && { options: parentNode.value.length })
                    });
                })
            }
        });

        console.log(parentClasses);
    }

    /**
     * Function that checks the state of a parent class and which UI should be rendered to handle the chain and change annotation target if necessary
     * @param parentClass The provided parent class
     */
    const CheckParentClass = (parentClass: ParentClass, index: number) => {
        /* Check if a potential previous parent class was not present, if so cancel render */
        if (index > 0 && !parentClasses[index - 1].present) {
            return <> </>;
        } else {
            console.log(parentClass);

            if (!parentClass.present) {
                return (
                    <div className="mt-2">
                        <div className="bgc-accent-soft br-corner px-3 py-1">
                            <p className="fs-4 fw-lightBold">
                                <FontAwesomeIcon icon={faCircleExclamation}
                                    className="tc-grey"
                                />
                                {` Parent class '${parentClass.name}' is not present.
                                Add a new instance of '${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')}' by
                                also adding the parent class.`}
                            </p>
                        </div>

                        <Button type="button"
                            variant="primary"
                            className="fs-5 mt-3 py-1 px-3"
                        >
                            {`Add instance of ${parentClass.name}`}
                        </Button>
                    </div>
                );
            } else if (parentClass.options) {
                const dropdownItems: DropdownItem[] = [];

                for (let i = 0; i < parentClass.options; i++) {
                    dropdownItems.push({
                        label: `${parentClass.name} #${i + 1}`,
                        value: `${parentClass.jsonPath}[${i}]`
                    });
                };

                return (
                    <div className="mt-2">
                        <div className="bgc-accent-soft br-corner px-3 py-1">
                            <p className="fs-4 fw-lightBold">
                                <FontAwesomeIcon icon={faCircleExclamation}
                                    className="tc-grey"
                                />
                                {` Specify on which '${parentClass.name}' the instance should be created.`}
                            </p>
                        </div>

                        <Dropdown items={dropdownItems}
                            styles={{
                                border: true,
                                borderRadius: '8px'
                            }}
                        />

                        <Button type="button"
                            variant="primary"
                            className="fs-5 mt-3 py-1 px-3"
                        >
                            {`Add instance of ${parentClass.name}`}
                        </Button>
                    </div>
                );
            } else {

            }
        }
    };

    return (
        <div>
            <Card className="bgc-primary mt-3 b-grey br-corner">
                <div className={`bgc-white pt-1 pb-2 px-3 tr-fast`}>
                    {/* Instance title and target type */}
                    <Row>
                        <Col>
                            <p className="tc-primary fw-lightBold">
                                {`${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')} *`}
                            </p>
                        </Col>
                        <Col lg="auto">
                            <p className="tc-primary fw-lightBold">
                                {MakeReadableString(annotationTarget?.type ?? '')}
                            </p>
                        </Col>
                    </Row>
                    {/* Parent class check */}
                    <Row>
                        <Col>
                            {parentClasses.map((parentClass, index) => CheckParentClass(parentClass, index))}
                        </Col>
                    </Row>
                    {/* Select new instance button */}
                    {/* <Row className="mt-2 mb-2">
                        <Col>
                            <Button type="button"
                                variant="primary"
                                className="fs-5 py-1 px-3"
                            disabled={selected}
                            OnClick={() => SetFieldValue?.('jsonPath', jsonPath)}
                            >
                                {!selected ? 'Select this instance' : 'Currently selected'}
                            </Button>
                        </Col>
                    </Row> */}
                </div>
            </Card>
        </div>
    );
};

export default NewInstance;