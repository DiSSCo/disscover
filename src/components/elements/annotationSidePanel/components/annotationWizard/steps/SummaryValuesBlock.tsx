/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { isEmpty } from 'lodash';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { FormatJsonPathFromFieldName } from 'app/utilities/AnnotateUtilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    className: string,
    values: Dict,
    index?: number
};


/**
 * Component that renders a block for holding values of one class or term and are displayed in the annotation wizard summary step
 * @param superClass The selected super class
 * @param className The name of the class of whose values are shown in the summary block
 * @param values A dictionary of values which are assigned to the class
 * @param index The index of the instance in the parent class array
 * @returns JSX Component
 */
const SummaryValuesBlock = (props: Props) => {
    const { superClass, className, values, index } = props;

    /* Base variables */
    // const indexTitle: string = typeof(index) !== 'undefined' ? ` #${index + 1}` : '';
    let title: string = MakeJsonPathReadableString(className);
    let classFieldPath: string = className;


    /* Add index to title and class field parh if present */
    if (typeof (index) !== 'undefined') {
        title = title.concat(` #${index + 1}`);
        classFieldPath = classFieldPath.concat(`_${index}`);
    }

    const classJsonPath: string = FormatJsonPathFromFieldName(classFieldPath);

    /* Class Names */
    const classTitleClass = classNames({
        'tc-accent': !jp.value(superClass, classJsonPath)
    });

    return (
        <div>
            <Card key={className}
                className="px-3 py-2"
            >
                <p className={`${classTitleClass} tc-primary fw-lightBold`}>
                    {title}
                </p>

                {/* Class values */}
                <div className="mt-1">
                    {!isEmpty(values) ?
                        <>
                            {Object.entries(values).sort(
                                (a, b) => a > b ? 1 : 0
                            ).map(([key, value]) => {
                                if (value) {
                                    const termFieldPath: string = `${classFieldPath}_'${key}'`;
                                    const termJsonPath: string = FormatJsonPathFromFieldName(termFieldPath);
                                    const existingValue: string | number | boolean = jp.value(superClass, termJsonPath);

                                    /* Class Name */
                                    const termTitleClass = classNames({
                                        'tc-accent': !existingValue || value !== existingValue
                                    });

                                    return (
                                        <Row key={key}>
                                            <Col>
                                                <p>
                                                    <span className={`${termTitleClass} fw-lightBold`}>
                                                        {`${MakeJsonPathReadableString(key)}: `}
                                                    </span>
                                                    {value}
                                                </p>
                                            </Col>
                                        </Row>
                                    );
                                }
                            })}
                        </>
                        : <p className="tc-grey fst-italic">
                            Has no attached values
                        </p>
                    }
                </div>
            </Card>
        </div>
    );
};

export default SummaryValuesBlock;