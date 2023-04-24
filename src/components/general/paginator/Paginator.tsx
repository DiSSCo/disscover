/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';


/* Props Typing */
interface Props {
    pageSize: number,
    pageNumber: number,
    paginationRange: number[],
    SetPaginationRange: Function
};


const Paginator = (props: Props) => {
    const { pageSize, pageNumber, paginationRange, SetPaginationRange } = props;

    /* Base variables */
    let pages: JSX.Element[] = [];

    /* Generate Paginator Pages */
    for (let i = 0; i < pageNumber; i++) {
        const page = i + 1;

        const PushToPages = (page: number) => {
            pages.push(
                <Pagination.Item key={i}
                    active={page === pageNumber}
                    onClick={() => SwitchPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        if (pageNumber > 4) {
            if ((page >= (pageNumber - 3) && page <= pageNumber) || (page <= (pageNumber + 3)) && page >= pageNumber) {
                PushToPages(page);
            }
        } else {
            PushToPages(page)
        }
    }

    /* Function for switching a Paginator Page */
    const SwitchPage = (input: string | number = 1) => {
        if (String(input) === 'up') {
            const newRange: number[] = [(paginationRange[0] + pageSize), (paginationRange[1] + pageSize)];

            // setCurrentPage(pageNumber + 1)
            SetPaginationRange(newRange);
        } else if (String(input) === 'down' && pageNumber > 1) {
            const newRange: number[] = [(paginationRange[0] - pageSize), (paginationRange[1] - pageSize)];

            // setCurrentPage(pageNumber - 1);
            SetPaginationRange(newRange);
        } else if (typeof (input) === 'number') {
            const newRange: number[] = [((pageSize * input) - pageSize), ((pageSize * input) - 1)];

            // setCurrentPage(input);
            SetPaginationRange(newRange);
        }
    }

    return (
        <div>
            <Pagination>
                <Pagination.Prev onClick={() => SwitchPage('down')} />
                {pages}
                <Pagination.Next onClick={() => SwitchPage('up')} />
            </Pagination>
        </div>
    );
}

export default Paginator;