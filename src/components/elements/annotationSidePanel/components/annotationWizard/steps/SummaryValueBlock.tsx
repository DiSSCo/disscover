/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { Card } from 'react-bootstrap';

/* Import Types */
import { SuperClass } from 'app/Types';


/* Props Type */
type Props = {
    superClass: SuperClass,
    termName: string,
    value: string | number | boolean,
    jsonPath: string,
    motivation: string
};


/**
 * Component that renders a block for holding values of one class or term and are displayed in the annotation wizard summary step
 * @param superClass The provided super class
 * @param termName The name of the term being annotated
 * @param value The value of the term being annotated
 * @param jsonPath The JSON path pointing towards the target
 * @param motivation The motivation for making the annotation
 * @returns JSX Component
 */
const SummaryValueBlock = (props: Props) => {
    const { superClass, termName, value, jsonPath, motivation } = props;

    /* Class Name */
    const termTitleClass = classNames({
        'tc-accent': jp.value(superClass, jsonPath) !== value && ['ods:adding', 'oa:editing'].includes(motivation)
    });
    
    return (
        <div>
            <Card className="px-3 py-2">
                <p>
                    <span className={`${termTitleClass} fw-lightBold`}>
                        {`${termName}: `}
                    </span>
                    {String(value)}
                </p>
            </Card>
        </div>
    );
};

export default SummaryValueBlock;