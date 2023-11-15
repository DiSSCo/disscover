/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { ReturnPropertiesFromNestedObject } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    targetPropertyName: string,
    targetPropertyType: string,
    instance: Dict,
    index: number
}


const ExistingInstance = (props: Props) => {
    const { targetPropertyName, targetPropertyType, instance, index } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const [collapseToggle, setCollapseToggle] = useState<boolean>(false);
    let i = index + 1;

    /* Get all properties and levels from existing instance */
    const propertiesList = ReturnPropertiesFromNestedObject(instance);

    /* Function for annotating this instance */
    const AnnotateInstance = () => {
        const copyAnnotateTarget = { ...annotateTarget };

        /* Set Annotate target to chosen class or property */
        copyAnnotateTarget.targetProperty = {
            type: targetPropertyType,
            name: targetPropertyName
        }

        /* Set Annotate target motivation */
        copyAnnotateTarget.motivation = 'oa:editing';

        dispatch(setAnnotateTarget(copyAnnotateTarget));
    }

    /* ClassNames */
    const instancePropertiesClass = classNames({
        'd-none': !collapseToggle,
        'd-block': collapseToggle
    });

    return (
        <div className={`${index > 0 && 'mt-2'} bgc-white b-grey rounded-c px-3 py-2`}>
            <Row>
                <Col>
                    <p className="fs-3 c-secondary fw-lightBold"> {`${targetPropertyName} #${i}`} </p>
                </Col>
                <Col className="col-md-auto">
                    <FontAwesomeIcon icon={collapseToggle ? faChevronUp : faChevronDown}
                        className="c-pointer"
                        onClick={() => setCollapseToggle(!collapseToggle)}
                    />
                </Col>
            </Row>

            <div className={instancePropertiesClass}>
                {/* For each property of instance: show key and value pair */}
                {propertiesList.map((propertyPair: { key: string, value: string | number | boolean }) => {
                    return (
                        <Row key={propertyPair.key} className="mt-1">
                            <Col className="col-md-auto pe-0">
                                <p className="fs-4 fw-lightBold"> {propertyPair.key}: </p>
                            </Col>
                            <Col className="ps-2">
                                <p className="fs-4"> {propertyPair.value} </p>
                            </Col>
                        </Row>
                    );
                })}

                <Row className="mt-3">
                    <Col>
                        <button type="button" className="secondaryButton px-2 py-1 fs-4"
                            onClick={() => AnnotateInstance()}
                        >
                            Annotate this class instance
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ExistingInstance;