/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { Card } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Dict } from 'app/Types';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    termName: string,
    value: string | number | boolean,
    jsonPath: string
};


/**
 * Component that renders a block for holding values of one class or term and are displayed in the annotation wizard summary step
 * @param superClass The provided super class
 * @param termName The name of the term being annotated
 * @param value The value of the term being annotated
 * @returns JSX Component
 */
const SummaryValueBlock = (props: Props) => {
    const { superClass, termName, value, jsonPath } = props;

    /* Class Name */
    const termTitleClass = classNames({
        'tc-accent': jp.value(superClass, jsonPath) !== value
    });
    
    return (
        <div>
            <Card className="px-3 py-2">
                <p>
                    <span className={`${termTitleClass} fw-lightBold`}>
                        {`${termName}: `}
                    </span>
                    {value}
                </p>
            </Card>
        </div>
    );
};

export default SummaryValueBlock;