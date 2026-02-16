/* Import styles */
import { Button } from '@radix-ui/themes';
import './Pagination.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface Props {
    count: number,
    PreviousAction: Function,
    NextAction: Function
}

/**
 * Pagination component
 * @returns JSX Component
 */
const Pagination = ({count, PreviousAction, NextAction}: Props) => {
    return (
        <div className="pagination-container">
            <Button variant="soft" size="2" onClick={PreviousAction}>
                <ChevronLeftIcon />
                Previous
            </Button>
            <div>
                <span>{count} collections</span>
                <span> • </span>
                <span>page 1 of 2</span>
            </div>
            <Button variant="soft" size="2" onClick={NextAction}>
                Next
                <ChevronRightIcon />
            </Button>
        </div>
    )
}

export default Pagination;