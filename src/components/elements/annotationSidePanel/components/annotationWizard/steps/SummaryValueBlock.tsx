/* Import Dependencies */
import classNames from 'classnames';
import { Card } from 'react-bootstrap';


/* Props Type */
type Props = {
    termName: string,
    value: string | number | boolean
};


/**
 * Component that renders a block for holding values of one class or term and are displayed in the annotation wizard summary step
 * @returns JSX Component
 */
const SummaryValueBlock = (props: Props) => {
    const { termName, value } = props;
    
    return (
        <div>
            <Card className="px-3 py-2">
                <p>
                    <span className="fw-lightBold">
                        {`${termName}: `}
                    </span>
                    {value}
                </p>
            </Card>
        </div>
    );
};

export default SummaryValueBlock;