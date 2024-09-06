/* Import Dependencies */
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';

/* Import Utilities */
import { ExtractClassesAndTermsFromSchema } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict
};


/**
 * Component that renders the cases step of the annotation wizard
 * @returns JSX Component
 */
const AnnotationTargetStep = (props: Props) => {
    const { schema } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const trigger = useTrigger();

    /* Base variables */
    const [classesList, setClassesList] = useState<{ label: string, value: string }[]>([]);
    const [termsList, setTermsList] = useState<{ label: string, options: { label: string, value: string }[] }[]>([]);
    const initialFormValues: {
        class: {
            label: string,
            value: string
        } | undefined,
        term: {
            label: string,
            value: string
        } | undefined,
        targetType: string | undefined
    } = {
        class: undefined,
        term: undefined,
        targetType: undefined
    };

    /* OnLoad: create classes and terms lists from schema source */
    trigger.SetTrigger(() => {
        ExtractClassesAndTermsFromSchema(schema).then(({
            classesList,
            termsList
        }) => {
            setClassesList(classesList);
            setTermsList(termsList);
        });
    }, []);

    return (
        <div>
            {/* Introduction text */}
            <Row>
                <Col>
                    <p>Define your annotation target</p>
                </Col>
            </Row>
            {/* Annotation cases */}
            <Row className="mt-3">
                <Col>
                    {/* Title */}
                    <Row>
                        <Col>
                            <p className="fw-lightBold">Benchmark classes</p>
                        </Col>
                    </Row>
                    {/* Case blocks */}
                    <Row className="mt-1">
                        {DigitalSpecimenAnnotationCases.annotationCases.map(annotationCase => {
                            return (
                                <Col key={annotationCase.name}
                                    lg={{ span: 6 }}
                                    className="my-1"
                                >
                                    <Button type="button"
                                        variant="accent"
                                        className="w-100 br-corner"
                                        OnClick={() => dispatch(setAnnotationTarget({
                                            type: annotationCase.type as 'superClass' | 'class',
                                            jsonPath: annotationCase.jsonPath
                                        }))}
                                    >
                                        <p className="fs-4 tc-white fw-lightBold text-center">
                                            {annotationCase.name}
                                        </p>
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
            {/* Advanced selection */}
            <Row className="mt-4">
                <Col>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={async (values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));

                            /* Check if class is the super class */
                            let classType: 'class' | 'superClass' = 'class';

                            if (values.class && values.class.value === '$') {
                                classType = 'superClass';
                            }

                            dispatch(setAnnotationTarget({
                                type: values.targetType === 'class' ? classType : 'term',
                                jsonPath: values.targetType === 'class' ? values.class?.value as string: values.term?.value as string,
                            }));
                        }}
                    >
                        {({ values, setFieldValue, submitForm }) => (
                            <Form>
                                <p className="fw-lightBold">
                                    Advanced selection
                                </p>
                                {/* Class selection */}
                                <Row className="mt-1">
                                    <Col>
                                        <Row className="pt-1">
                                            <Col>
                                                <p className="fs-4">
                                                    Opt to select a class
                                                </p>
                                            </Col>
                                            <Col lg="auto"
                                                className="d-flex align-items-center"
                                            >
                                                <p className="fs-5 tc-grey">
                                                    (A selected class will filter the term selection below)
                                                </p>
                                            </Col>
                                        </Row>

                                        <Select options={classesList}
                                            className="mt-2"
                                            onChange={(option: SingleValue<{ label: string; value: string; }>) => {
                                                setFieldValue('class', option);
                                                setFieldValue('term', undefined);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/* Term selection */}
                                <Row className="mt-3">
                                    <Col>
                                        <p className="fs-4">
                                            Opt to select an individual term
                                        </p>
                                        <Select options={values.class?.value ?
                                            termsList.filter(termCollection => termCollection.label === values.class?.label)
                                            : termsList
                                        }
                                            value={values.term ?? null}
                                            placeholder="Select..."
                                            className="mt-2"
                                            onChange={(option: SingleValue<{ label: string; value: string; }>) => {
                                                setFieldValue('term', option);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/* Submit buttons */}
                                {values.class &&
                                    <Row className="mt-3">
                                        <Col lg>
                                            <Button type="button"
                                                variant="accent"
                                                OnClick={() => {
                                                    setFieldValue('targetType', 'class');
                                                    submitForm();
                                                }}
                                            >
                                                <p>{`Target class: ${values.class?.label}`}</p>
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                {values.term &&
                                    <Row className="mt-3">
                                        <Col lg>
                                            <Button type="button"
                                                variant="accent"
                                                OnClick={() => {
                                                    setFieldValue('targetType', 'term');
                                                    submitForm();
                                                }}
                                            >
                                                <p>{`Target term: ${values.term?.label}`}</p>
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationTargetStep;