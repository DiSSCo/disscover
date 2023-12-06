/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, getEditAnnotation, setEditAnnotation, setAnnotationFormToggle } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    values: Dict,
    AnnotateNewInstance: Function
};


const FormBottom = (props: Props) => {
    const { values, AnnotateNewInstance } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);
    
    return (
        <>
            {/* Annotate new instance of button */}
            {((values.targetClass || values.targetField) && !annotateTarget.targetProperty.name && isEmpty(editAnnotation)) &&
                <Row className="flex-grow-1 py-3">
                    <Col>
                        <button type="button" className="secondaryButton w-100"
                            onClick={() => AnnotateNewInstance(
                                values.targetField ? 'field' : 'class',
                                values.targetField ? values.targetField : values.targetClass
                            )}
                        >
                            Annotate new instance of {values.targetField ? 'property' : 'class'}

                            <FontAwesomeIcon icon={faPlus} className="mx-2" />
                        </button>
                    </Col>
                </Row>
            }
            {/* Submit Button */}
            <Row className={`${(!values.motivation && !annotateTarget.motivation) && 'flex-grow-1 align-items-end'}`}>
                <Col>
                    <button type="button"
                        className="primaryButton cancel px-4 py-1"
                        onClick={() => {
                            dispatch(setEditAnnotation({} as Annotation));
                            dispatch(setAnnotationFormToggle(false));
                        }}
                    >
                        Cancel
                    </button>
                </Col>
                <Col className="col-md-auto">
                    <button type="submit"
                        className={`primaryButton ${(!values.motivation || ((values.targetField && !values.annotationValue))) ? 'disabled' : ''} px-4 py-1`}
                        disabled={!values.motivation || ((values.targetField && !values.annotationValue))}
                    >
                        Save
                    </button>
                </Col>
            </Row>
        </>
    )
}

export default FormBottom;