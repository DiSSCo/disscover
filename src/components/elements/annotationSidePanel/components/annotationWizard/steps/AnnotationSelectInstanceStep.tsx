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


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict
};


/**
 * Component that renders the instance selection of the annotation wizard
 * @param superClass 
 * @returns JSX Component
 */
const AnnotationSelectInstanceStep = (props: Props) => {
    const { superClass } = props;

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

        // queryResults.forEach(result => {
        //     if (typeof result === 'string') {
        //         console.log(jp.paths(superClass, result));
        //         /* Treat as a plain string */
        //         existingInstances.push({
        //             label: result,
        //             jsonPath: annotationTarget.jsonPath
        //         });
        //     } else if (Array.isArray(result)) {
        //         /* Treat as an array of dictionaries */
        //         // result.forEach(resultDict => {
        //         //     existingInstances.push({
        //         //         label: 
        //         //     });
        //         // });
        //     } else {
        //         /* Treat as a dictionary */
        //     }
        // });
    }

    return (
        <div>
            {/* Selected annotation target */}
            <Row>
                <Col>
                    <p>
                        Annotate a new or existing instance
                    </p>
                </Col>
            </Row>
            {/* Annotate a new instance */}
            <Row className="mt-4">
                <Col>
                    <p className="fw-lightBold">
                        A new instance
                    </p>
                </Col>
            </Row>
            {/* Annotate an existing instance */}
            <Row className="mt-4">
                <Col>
                    <p className="fw-lightBold">
                        Existing instances
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationSelectInstanceStep;