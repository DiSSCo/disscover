/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';

/* Import Utilities */
import { ExtractClassesAndTermsFromSchema, MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    schema: Dict,
    formValues?: Dict,
    SetFieldValue?: Function,
    SetAnnotationTarget?: Function
};


/**
 * Component that renders the cases target selection of the annotation wizard
 * @returns JSX Component
 */
const AnnotationTargetStep = (props: Props) => {
    const { schema, formValues, SetFieldValue, SetAnnotationTarget } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const [classesList, setClassesList] = useState<{ label: string, value: string }[]>([]);
    const [termsList, setTermsList] = useState<{ label: string, options: { label: string, value: string }[] }[]>([]);

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
                                    OnClick={() => SetAnnotationTarget?.({
                                        label: formValues.class?.label,
                                        value: formValues.class.value
                                    }, 'class')}
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
                                    OnClick={() => SetAnnotationTarget?.({
                                        label: formValues.term?.label,
                                        value: formValues.term?.value
                                    }, 'term')}
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