/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { FormatTargetPropertyPath } from 'app/utilities/AnnotationUtilities';
import { ReturnPropertiesFromNestedObject } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Property, Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    targetPropertyName: string,
    targetPropertyType: string,
    instance: Dict | Property,
    index: number
}


const ExistingInstance = (props: Props) => {
    const { targetPropertyName, targetPropertyType, instance, index } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const [collapseToggle, setCollapseToggle] = useState<boolean>(false);
    let propertiesList: { key: string, value: Property }[] = [];
    let i = index + 1;
    const formattedTargetPropertyName = FormatTargetPropertyPath(targetPropertyName, annotateTarget.targetType, index);

    /* If target is class, get all properties and levels from existing instance */
    if (targetPropertyType === 'class') {
        propertiesList = ReturnPropertiesFromNestedObject(instance as Dict);
    }

    /* Function for annotating this instance */
    const AnnotateInstance = () => {
        const copyAnnotateTarget = { ...annotateTarget };

        /* Set Annotate target to chosen class or property */
        copyAnnotateTarget.targetProperty = {
            type: targetPropertyType,
            name: formattedTargetPropertyName,
            index: index
        }

        /* Set Annotate target current values */
        if (targetPropertyType === 'field' && typeof(instance) === 'object') {
            copyAnnotateTarget.currentValue = [instance[targetPropertyName.split('.').pop() as string] as Property];
        } else {
            copyAnnotateTarget.currentValue = [instance];
        }

        /* Set Annotate target motivation */
        copyAnnotateTarget.motivation = 'ods:adding';

        dispatch(setAnnotateTarget(copyAnnotateTarget));
    }

    /* Function to list all existing instances */
    const ListExistingInstances = () => {
        const existingInstances: JSX.Element[] = [];

        propertiesList.forEach((propertyPair: { key: string, value: Property }) => {
            existingInstances.push(
                <Row key={propertyPair.key} className="mt-1">
                    <Col className="col-md-auto pe-0">
                        <p className="fs-4 fw-lightBold"> {propertyPair.key}: </p>
                    </Col>
                    <Col className="ps-2">
                        <p className="fs-4"> {propertyPair.value} </p>
                    </Col>
                </Row>
            );
        })

        return existingInstances;
    }

    /* ClassNames */
    const instancePropertiesClass = classNames({
        'd-none': !collapseToggle,
        'd-block': collapseToggle
    });

    return (
        <div className={`${index > 0 && 'mt-2'} bgc-white b-grey rounded-c px-3 py-2`}>
            <Row>
                <Col className="overflow-hidden">
                    <p className="fs-3 c-secondary fw-lightBold textOverflow"> {`${targetPropertyName} #${i}`} </p>
                </Col>
                {targetPropertyType === 'class' &&
                    <Col className="col-md-auto">
                        <FontAwesomeIcon icon={collapseToggle ? faChevronUp : faChevronDown}
                            className="c-pointer"
                            onClick={() => setCollapseToggle(!collapseToggle)}
                        />
                    </Col>
                }
            </Row>

            {targetPropertyType === 'class' ?
                <div className={instancePropertiesClass}>
                    {/* For each property of instance: show key and value pair */}
                    {ListExistingInstances()}
                </div>
                : <div>
                    <Row className="mt-1">
                        <Col className="col-md-auto pe-0">
                            <p className="fs-4 fw-lightBold"> {formattedTargetPropertyName}: </p>
                        </Col>
                        <Col className="ps-2">
                            {typeof (instance) === 'object' ?
                                <p className="fs-4"> {instance[targetPropertyName.split('.').pop() as string] as Property ?? 'Undefined'} </p>
                                : <p className="fs-4"> {instance} </p>
                            }
                        </Col>
                    </Row>
                </div>
            }

            <Row className="mt-3">
                <Col>
                    <button type="button" className="secondaryButton px-3 py-1 fs-4"
                        onClick={() => AnnotateInstance()}
                    >
                        Annotate this {targetPropertyType === 'class' ? 'class' : 'property'} instance
                    </button>
                </Col>
            </Row>
        </div>
    );
}

export default ExistingInstance;