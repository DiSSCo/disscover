/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import jp from 'jsonpath';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

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
    selected: boolean,
    annotationTarget?: AnnotationTarget,
    formValues?: Dict,
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
 * @param selected Boolean indicating if the new instance option has been selected
 * @param annotationTarget The annotation target set
 * @param formValues The current values in the annotation wizard form
 * @param SetFieldValue Function to set a value of a field in the form
 * @returns JSX Component
 */
const NewInstance = (props: Props) => {
    const { superClass, selected, annotationTarget, formValues, SetFieldValue } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
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

                    parentNodes.forEach(parentNode => {
                        parentClasses.push({
                            jsonPath: jp.stringify(parentNode.path).replaceAll('"', "'"),
                            name: MakeJsonPathReadableString(jp.stringify(parentNode.path)),
                            ...(index > 0 && { parentName: pathArray[index] }),
                            present: (Array.isArray(parentNode.value) && !!parentNode.value.length) || (!Array.isArray(parentNode.value) && typeof (parentNode.value) === 'object'),
                            ...(parentNode.value.length && { options: parentNode.value.length })
                        });
                    });
                }
            });
        }

        setParentClasses(parentClasses);
    }, [annotationTarget]);

    /**
     * Function that checks the state of a parent class and which UI should be rendered to handle the chain and change annotation target if necessary
     * @param parentClass The provided parent class
     */
    const CheckParentClass = (parentClass: ParentClass, index: number) => {
        /* Check if a potential previous parent class was not present, if so cancel render */
        if (index > 0 && !parentClasses[index - 1].present) {
            return <> </>;
        } else {
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
                            disabled={selected}
                            className="fs-5 mt-3 py-1 px-3"
                            OnClick={() => {
                                if (annotationTarget) {
                                    /* Set field values in form to parent class */
                                    SetFieldValue?.('jsonPath', `${parentClass.jsonPath}[0]`);
                                    SetFieldValue?.('class', {
                                        label: MakeJsonPathReadableString(parentClass.jsonPath),
                                        value: parentClass.jsonPath
                                    });
                                    SetFieldValue?.('term', undefined);

                                    /* Set annotation target to parent class */
                                    dispatch(setAnnotationTarget({
                                        jsonPath: parentClass.jsonPath,
                                        type: 'class'
                                    }));
                                }
                            }}
                        >
                            {!selected ? `Add instance of ${parentClass.name}` : 'Currently selected'}
                        </Button>
                    </div>
                );
            } else if (parentClass.options) {
                const dropdownItems: DropdownItem[] = [];

                for (let i = 0; i < parentClass.options; i++) {
                    dropdownItems.push({
                        label: `${parentClass.name} #${i + 1}`,
                        value: `${i}`
                    });
                };

                return (
                    <div className="mt-2">
                        <div className="bgc-accent-soft br-corner mb-2 px-3 py-1">
                            <p className="fs-4 fw-lightBold">
                                <FontAwesomeIcon icon={faCircleExclamation}
                                    className="tc-grey"
                                />
                                {` Specify on which '${parentClass.name}' the instance should be created.`}
                            </p>
                        </div>

                        <Dropdown items={dropdownItems}
                            hasDefault={false}
                            placeholder="Select"
                            selectedItem={formValues?.parentClassDropdownValues[parentClass.name] >= 0 ? {
                                label: `${parentClass.name} #${formValues?.parentClassDropdownValues[parentClass.name] + 1}`,
                                value: formValues?.parentClassDropdownValues[parentClass.name]
                            } : undefined}
                            styles={{
                                border: true,
                                borderRadius: '8px'
                            }}
                            OnChange={(option: DropdownItem) => {
                                /* Set selected parent index in annotation wizard form */
                                SetFieldValue?.(`parentClassDropdownValues.${parentClass.name}`, Number(option.value));

                                /* Set class as present in parent classes state */
                                parentClasses[parentClasses.findIndex(parentClassInstance => parentClassInstance.name === parentClass.name)].present = true;

                                setParentClasses([...parentClasses]);
                            }}
                        />

                        {!parentClasses.find(parentClass => !parentClass.present) &&
                            <Button type="button"
                                variant="primary"
                                disabled={!(formValues?.parentClassDropdownValues[parentClass.name] >= 0) || selected}
                                className="fs-5 mt-3 py-1 px-3"
                                OnClick={() => {
                                    /* Set field value in annotation form */
                                    const jsonPath: string = annotationTarget?.jsonPath.replace(parentClass.jsonPath, `${parentClass.jsonPath}[${formValues?.parentClassDropdownValues[parentClass.name]}]`) ?? '';
                                    const latestIndex: any = jp.query(superClass, jsonPath)[0].length;

                                    SetFieldValue?.('jsonPath', `${jsonPath}[${latestIndex}]`);
                                }}
                            >
                                {!selected ? `Add instance of ${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')}` : 'Currently selected'}
                            </Button>
                        }
                    </div>
                );
            }
        }
    };

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

                                        SetFieldValue?.('jsonPath', `${annotationTarget.jsonPath}[${latestIndex}]`);
                                    }}
                                >
                                    {!selected ? `Add instance of ${MakeJsonPathReadableString(annotationTarget.jsonPath)}` : 'Currently selected'}
                                </Button>
                            </Col>
                        </Row>
                        : <Row>
                            <Col>
                                {parentClasses.map((parentClass, index) => CheckParentClass(parentClass, index))}
                            </Col>
                        </Row>
                    }
                </div>
            </Card>
        </div>
    );
};

export default NewInstance;