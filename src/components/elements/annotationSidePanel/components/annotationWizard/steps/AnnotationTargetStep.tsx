/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';

/* Import Utilities */
import { ExtractClassesAndTermsFromSchema, MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useAppSelector, useTrigger } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict,
    annotationCases: {
        name: string;
        type: string;
        jsonPath: string;
        icon: string;
    }[],
    formValues?: Dict,
    SetFieldValue?: Function,
    SetAnnotationTarget?: Function
};


/**
 * Component that renders the cases target selection of the annotation wizard
 * @param schema The base schema to build upon
 * @param annotationCases Default annotation cases that can be selected as the annotation target
 * @param formValues The values of the annotation wizard form state
 * @param SetFieldValue Function to set the value of form field in the annotation wizard form
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const AnnotationTargetStep = (props: Props) => {
    const { schema, annotationCases, formValues, SetFieldValue, SetAnnotationTarget } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const [classesList, setClassesList] = useState<{ label: string, value: string }[]>([]);
    const [termsList, setTermsList] = useState<{ label: string, options: { label: string, value: string }[] }[]>([]);

    /* OnLoad: create classes and terms lists from schema source and reset annotation values within form values */
    trigger.SetTrigger(() => {
        ExtractClassesAndTermsFromSchema(schema).then(({
            classesList,
            termsList
        }) => {
            setClassesList(classesList);
            setTermsList(termsList);
        });

        SetFieldValue?.('annotationValues', {});
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
                        {annotationCases.map(annotationCase => {
                            return (
                                <Col key={annotationCase.name}
                                    lg={{ span: 6 }}
                                    className="my-1"
                                >
                                    <Button type="button"
                                        variant="accent"
                                        className="w-100 br-corner"
                                        OnClick={() => {
                                            const classOption: {
                                                label: string,
                                                value: string
                                            } = {
                                                label: classesList.find(classOption => classOption.value === annotationCase.jsonPath)?.label ??
                                                    MakeJsonPathReadableString(annotationCase.jsonPath),
                                                value: annotationCase.jsonPath
                                            }

                                            /* Set form values */
                                            SetFieldValue?.('class', classOption);
                                            SetFieldValue?.('term', undefined);
                                            SetFieldValue?.('jsonPath', undefined);
                                            SetFieldValue?.('parentClassDropdownValues', {});

                                            /* Set annotation target */
                                            SetAnnotationTarget?.(classOption, 'class');
                                        }}
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
                                value={formValues?.class}
                                className="mt-2"
                                onChange={(option: SingleValue<{ label: string; value: string; }>) => {
                                    SetFieldValue?.('class', option);
                                    SetFieldValue?.('term', undefined);
                                    SetFieldValue?.('jsonPath', undefined);
                                    SetFieldValue?.('parentClassDropdownValues', {});
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
                            <Select options={formValues?.class?.value ?
                                termsList.filter(termCollection => termCollection.label === formValues.class?.label)
                                : termsList
                            }
                                value={formValues?.term ?? null}
                                placeholder="Select..."
                                className="mt-2"
                                onChange={(option: SingleValue<{ label: string; value: string; }>) => {
                                    SetFieldValue?.('term', option);
                                    SetFieldValue?.('jsonPath', undefined);
                                    SetFieldValue?.('parentClassDropdownValues', {});
                                }}
                            />
                        </Col>
                    </Row>
                    {/* Submit buttons */}
                    {formValues?.class &&
                        <Row className="mt-3">
                            <Col lg>
                                <Button type="button"
                                    variant="accent"
                                    OnClick={() => {
                                        /* Make sure JSON path in form values is reset if it differs from annotation target */
                                        if (formValues.class?.value !== annotationTarget?.jsonPath) {
                                            SetFieldValue?.('jsonPath', undefined);
                                        }

                                        /* Set annotation target */
                                        SetAnnotationTarget?.({
                                            label: formValues.class?.label,
                                            value: formValues.class.value
                                        }, 'class');
                                    }}
                                >
                                    <p>{`Target class: ${formValues.class?.label}`}</p>
                                </Button>
                            </Col>
                        </Row>
                    }
                    {formValues?.term &&
                        <Row className="mt-3">
                            <Col lg>
                                <Button type="button"
                                    variant="accent"
                                    OnClick={() => {
                                        /* Make sure JSON path in form values is reset if it differs from annotation target */
                                        if (formValues.term?.value !== annotationTarget?.jsonPath) {
                                            SetFieldValue?.('jsonPath', undefined);
                                        }

                                        /* Set annotation target */
                                        SetAnnotationTarget?.({
                                            label: formValues.term?.label,
                                            value: formValues.term?.value
                                        }, 'term');
                                    }}
                                >
                                    <p>{`Target term: ${formValues.term?.label}`}</p>
                                </Button>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationTargetStep;