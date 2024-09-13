/* Import Dependencies */
import jp, { PathComponent } from 'jsonpath';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';

/* Import Components */
import NewInstance from './NewInstance';
import ExistingInstance from './ExistingInstance';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    schemaTitle?: string,
    formValues?: Dict,
    SetFieldValue?: Function,
    GoToStep?: Function
};


/**
 * Component that renders the instance selection of the annotation wizard
 * @param superClass The provided super class
 * @param schemaTitle The title of the super class' schema
 * @param formValues The current values of the parent form
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const AnnotationSelectInstanceStep = (props: Props) => {
    const { superClass, schemaTitle, formValues, SetFieldValue, GoToStep } = props;

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    let nodes: {
        path: PathComponent[];
        value: any;
    }[] = [];

    /* Find all existing instances of the annotation target in the provided super class and process them into a workable format */
    if (annotationTarget) {
        /* Construct json target path */
        let jsonTargetPath: string = '';

        /* Insert the json path library double dots before every square bracket in order to select everything linked to the path */
        annotationTarget.jsonPath.split('[').forEach((pathSegment, index) => {
            if (index) {
                jsonTargetPath = jsonTargetPath.concat(`..[${pathSegment}`);
            } else {
                jsonTargetPath = jsonTargetPath.concat(pathSegment);
            }
        });

        /* Query the super class digital object using the annotation target's json path and find the existing nodes */
        nodes = jp.nodes(superClass, jsonTargetPath);
    }

    /* Construct title text */
    let titleText: string = 'Annotate a new or existing instance?';

    if ((nodes.length && annotationTarget?.type === 'term') ||
        (annotationTarget?.type !== 'term' && !jp.parse(annotationTarget?.jsonPath ?? '').slice(-1)[0].expression.value.includes('has'))
    ) {
        titleText = 'Annotate an existing instance';
    } else if (!nodes.length || (annotationTarget?.type !== 'term' && Array.isArray(nodes[0].value) && !nodes[0].value.length)) {
        titleText = 'Annotate a new instance as there is no existing one';
    }

    return (
        <div className="h-100 d-flex flex-column">
            {/* Selected annotation target */}
            <Row>
                <Col>
                    <p>
                        {titleText}
                    </p>
                </Col>
            </Row>
            {/* Annotate a new instance */}
            {(!nodes.length || (annotationTarget?.type === 'term' && !nodes.length) || (annotationTarget?.type !== 'term' && jp.parse(annotationTarget?.jsonPath ?? '').slice(-1)[0].expression.value.includes('has'))) &&
                <Row className="mt-4">
                    <Col>
                        <p className="fw-lightBold">
                            A new instance
                        </p>

                        <NewInstance superClass={superClass}
                            annotationTarget={annotationTarget}
                            selected={formValues?.jsonPath && !jp.query(superClass, formValues?.jsonPath).length}
                            formValues={formValues}
                            SetFieldValue={SetFieldValue}
                        />
                    </Col>
                </Row>
            }
            {/* Annotate an existing instance */}
            {(!nodes.length || !(annotationTarget?.type !== 'term' && Array.isArray(nodes[0].value) && !nodes[0].value.length)) &&
                <Row className="flex-grow-1 mt-4 overflow-hidden">
                    <Col className="h-100 d-flex flex-column">
                        <p className="fw-lightBold">
                            Existing instances
                        </p>

                        <Row className="flex-grow-1 overflow-scroll mt-3">
                            <Col>
                                {nodes.map((node, index) => {
                                    /* Check if node is a class or term */
                                    if (Array.isArray(node.value)) {
                                        return node.value.map((value, valueIndex) => {
                                            const key = `existingInstance-${index}-${valueIndex}`;

                                            return (
                                                <ExistingInstance key={key}
                                                    jsonPath={jp.stringify([...node.path, valueIndex]).replaceAll('"', "'")}
                                                    instanceValue={value}
                                                    schemaTitle={schemaTitle}
                                                    selected={formValues?.jsonPath === jp.stringify([...node.path, valueIndex]).replaceAll('"', "'")}
                                                    SetFieldValue={SetFieldValue}
                                                />
                                            );
                                        });
                                    } else {
                                        const key = `existingInstance-${index}`;

                                        return (<ExistingInstance key={key}
                                            jsonPath={jp.stringify(node.path).replaceAll('"', "'")}
                                            instanceValue={node.value}
                                            schemaTitle={schemaTitle}
                                            selected={formValues?.jsonPath === jp.stringify(node.path).replaceAll('"', "'")}
                                            SetFieldValue={SetFieldValue}
                                        />);
                                    }
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default AnnotationSelectInstanceStep;