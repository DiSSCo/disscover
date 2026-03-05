/* Import dependencies */
import { screen } from '@testing-library/react';
import { render } from 'tests/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/* Import components */
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the amount of pages, the current page and the total amount of items', () => {
        const props = {
            totalAmount: 100,
            currentPage: 1,
            maxPerPage: 24,
            onPageChange: vi.fn(),
            content: 'dinosaurs'
        }
        render(<Pagination {...props} />);

        expect(screen.getByText('100 dinosaurs')).toBeInTheDocument();
        expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });

    it('should disable the previous button if currentPage is 1', () => {
        const props = {
            totalAmount: 100,
            currentPage: 1,
            maxPerPage: 24,
            onPageChange: vi.fn(),
            content: 'dinosaurs'
        }
        render(<Pagination {...props} />);

        expect(screen.getByText('100 dinosaurs')).toBeInTheDocument();
        expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('should disable the next button if currentPage is the last page', () => {
        const props = {
            totalAmount: 100,
            currentPage: 4,
            maxPerPage: 25,
            onPageChange: vi.fn(),
            content: 'dinosaurs'
        }
        render(<Pagination {...props} />);

        expect(screen.getByText('100 dinosaurs')).toBeInTheDocument();
        expect(screen.getByText('Page 4 of 4')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('should call the onPageChange function when the previous button is clicked', () => {
        const props = {
            totalAmount: 100,
            currentPage: 1,
            maxPerPage: 24,
            onPageChange: vi.fn(),
            content: 'dinosaurs'
        }
        render(<Pagination {...props} />);

        screen.getByRole('button', { name: /next/i }).click();
        expect(props.onPageChange).toHaveBeenCalledWith(2);
        expect(props.onPageChange).toHaveBeenCalledTimes(1);
    });
});