/* Import styles */
import './Pagination.scss';

/* Import components */
import { Button } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface Props {
    totalAmount: number;
    currentPage: number;
    maxPerPage: number;
    onPageChange: (newPage: number) => void;
    content: string;
}

/**
 * Pagination component
 * @returns JSX Component
 */
export const Pagination = ({ totalAmount, currentPage, maxPerPage, onPageChange, content }: Props) => {
    /* Base variables */
    const totalPages = Math.ceil(totalAmount / maxPerPage);

    /* Generic page change handler */
    const handlePrevious = () => { if (currentPage > 1) onPageChange(currentPage - 1)};
    const handleNext = () => { if (currentPage < totalPages) onPageChange(currentPage + 1)};

    return (
        <div className="pagination-container">
            <Button variant="soft" size="2" onClick={handlePrevious} disabled={currentPage <= 1}>
                <ChevronLeftIcon />
                Previous
            </Button>
            <div className="pagination-info">
                <span>{totalAmount} {content}</span>
                <span> • </span>
                <span>Page {currentPage} of {totalPages}</span>
            </div>
            <Button variant="soft" size="2" onClick={handleNext} disabled={currentPage >= totalPages}>
                Next
                <ChevronRightIcon />
            </Button>
        </div>
    )
}