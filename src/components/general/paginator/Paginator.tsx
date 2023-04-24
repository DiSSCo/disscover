/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';


/* Props Typing */
interface Props {
    pageSize: number,
    pageNumber: number,
    SetPaginationRange: Function
};


const Paginator = (props: Props) => {
    const { pageSize, pageNumber, SetPaginationRange } = props;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationRange, setPaginationRange] = useState<number[]>([0, (pageSize - 1)]);

    useEffect(() => {
        SetPaginationRange(paginationRange);
    }, [paginationRange, SetPaginationRange]);

    let pages: JSX.Element[] = [];

    for (let i = 0; i < pageNumber; i++) {
        const page = i + 1;

        const PushToPages = (page: number) => {
            pages.push(
                <Pagination.Item key={i}
                    active={page === currentPage}
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

    const SwitchPage = (input: string | number = 1) => {
        if (String(input) === 'up') {
            const newRange: number[] = [(paginationRange[0] + pageSize), (paginationRange[1] + pageSize)];

            setCurrentPage(currentPage + 1)
            setPaginationRange(newRange);
        } else if (String(input) === 'down' && currentPage > 1) {
            const newRange: number[] = [(paginationRange[0] - pageSize), (paginationRange[1] - pageSize)];

            setCurrentPage(currentPage - 1);
            setPaginationRange(newRange);
        } else if (typeof (input) === 'number') {
            const newRange: number[] = [((pageSize * input) - pageSize), ((pageSize * input) - 1)];

            setCurrentPage(input);
            setPaginationRange(newRange);
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