/* Import Dependencies */
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

/* Import Types */
import { Dict } from "global/Types";


/* Props Typing */
interface Props {
    items: Dict[],
    pageSize: number,
    SetPaginationRange: Function
};


const Paginator = (props: Props) => {
    const {items, pageSize, SetPaginationRange} = props;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationRange, setPaginationRange] = useState<number[]>([0, (pageSize - 1)]);

    useEffect(() => {
        SetPaginationRange(paginationRange);
    }, [paginationRange, SetPaginationRange]);

    const pageCount: number = items.length / pageSize;

    let pages: JSX.Element[] = [];

    for (let i = 0; i < pageCount; i++) {
        const page = i + 1;

        pages.push(
            <Pagination.Item key={i}
                active={page === currentPage}
                onClick={() => SwitchPage(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    const SwitchPage = (input: string | number = 1) => {
        if (String(input) === 'up' && currentPage < pages.length) {
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