/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { AnnotationTarget, Dict, ParentClass } from 'app/Types';

/* Import Components */
import ParentClassification from './ParentClassification';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    selected: boolean,
    annotationTarget?: AnnotationTarget,
    formValues?: Dict,
    SetFieldValue?: Function
};


/**
 * Component that renders a new, annotatable instance of the selected annotation target in the select instance step of the wizard
 * @param superClass The provided super class
 * @param selected Boolean indicating if the new instance option has been selected
 * @param annotationTarget The annotation target set
 * @param formValues The current values in the annotation wizard form
 * @param SetFieldValue Function to set a value of a field in the form
 * @returns JSX Component
 */
const NewInstance = (props: Props) => {
    const { superClass, selected, annotationTarget, formValues, SetFieldValue } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const [parentClasses, setParentClasses] = useState<ParentClass[]>([]);

    /* Check for parent classes, they either contain the term 'has' or start with a capital */
    trigger.SetTrigger(() => {
        const parentClasses: ParentClass[] = [];

        if (annotationTarget) {
            const pathArray: string[] = ['$'];
            const parents = jp.parse(annotationTarget.jsonPath).slice(1, -1);

            parents.forEach((parent, index) => {
                /* Filter path from schemas */
                let parentName = parent.expression.value.replace('ods:', '').replace('dwc:', '').replace('dcterms:', '');

                /* Add to pathArray */
                pathArray.push(parent.expression.value);

                if (parentName.includes('has') || parentName[0] === parentName[0].toUpperCase()) {
                    /* If a parent class is empty, it needs to be targeted, if it is not completely empty, check for indexes */
                    const parentNodes = jp.nodes(superClass, jp.stringify(pathArray).replace('][', ']..[').replaceAll('"', "'"));

                    if (!parentNodes.length) {
                        parentClasses.push({
                            jsonPath: jp.stringify(pathArray).replaceAll('"', "'"),
                            name: MakeJsonPathReadableString(jp.stringify(pathArray)),
                            ...(index > 0 && { parentName: pathArray[index] }),
                            present: false
                        });
                    }

                    parentNodes.forEach((parentNode, parentIndex) => {
                        parentClasses.push({
                            jsonPath: jp.stringify(parentNode.path).replaceAll('"', "'"),
                            name: MakeJsonPathReadableString(jp.stringify(parentNode.path)),
                            ...(index > 0 && { parentName: MakeJsonPathReadableString(pathArray[index]) }),
                            present: (Array.isArray(parentNode.value) && !!parentNode.value.length) || (!Array.isArray(parentNode.value) && typeof (parentNode.value) === 'object'),
                            ...(parentNode.value.length && { options: parentNode.value.length }),
                            ...(parentClasses[parentIndex]?.options && { dependent: true })
                        });
                    });
                }
            });
        }

        setParentClasses(parentClasses);
    }, [annotationTarget]);

    /* Class Names */
    const selectedDivClass = classNames({
        'b-primary br-selected': selected
    });

    return (
        <div>
            <Card className="bgc-primary mt-3 b-grey br-corner">
                <div className={`${selectedDivClass} bgc-white pt-1 pb-2 px-3 tr-fast`}>
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
                    {/* Render content based upon parent class check or just the set json path button if there are not any and the target is a class with an array */}
                    {(!parentClasses.length && annotationTarget && (annotationTarget.type !== 'term' && jp.parse(annotationTarget.jsonPath).slice(-1)[0].expression.value.includes('has'))) ?
                        <Row>
                            <Col>
                                <Button type="button"
                                    variant="primary"
                                    disabled={selected}
                                    className="fs-5 mt-3 py-1 px-3"
                                    OnClick={() => {
                                        const latestIndex: any = jp.query(superClass, annotationTarget.jsonPath)[0].length;

                                        SetFieldValue?.('motivation', 'ods:adding');
                                        SetFieldValue?.('jsonPath', `${annotationTarget.jsonPath}[${latestIndex}]`);
                                    }}
                                >
                                    {!selected ? `Add instance of ${MakeJsonPathReadableString(annotationTarget.jsonPath)}` : 'Currently selected'}
                                </Button>
                            </Col>
                        </Row>
                        : <Row>
                            <Col>
                                {parentClasses.map((parentClass, index) => {
                                    /* Key of parent class component */
                                    const key = `parentClass-${index}`;

                                    return (
                                        <ParentClassification key={key}
                                            index={index}
                                            parentClass={parentClass}
                                            selected={selected}
                                            parentClasses={parentClasses}
                                            annotationTarget={annotationTarget}
                                            formValues={formValues}
                                            superClass={superClass}
                                            SetFieldValue={SetFieldValue}
                                            SetParentClasses={setParentClasses}
                                        />
                                    );
                                })}
                            </Col>
                        </Row>
                    }
                </div>
            </Card>
        </div>
    );
};

export default NewInstance;