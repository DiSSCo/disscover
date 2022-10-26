import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";


const Paginator = (props) => {
    const items = props.items;
    const pageSize = props.pageSize;

    const [currentPage, setCurrentPage] = useState(1);
    const [paginationRange, setPaginationRange] = useState([0, (pageSize - 1)]);

    useEffect(() => {
        props.SetPaginationRange(paginationRange);
    }, [paginationRange]);

    const pageCount = items.length / pageSize;

    let pages = [];

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

    function SwitchPage(input = 1) {
        if (input == 'up' && currentPage < pages.length) {
            const newRange = [(paginationRange[0] + pageSize), (paginationRange[1] + pageSize)];

            setCurrentPage(currentPage + 1)
            setPaginationRange(newRange);
        } else if (input == 'down' && currentPage > 1) {
            const newRange = [(paginationRange[0] - pageSize), (paginationRange[1] - pageSize)];

            setCurrentPage(currentPage - 1);
            setPaginationRange(newRange);
        } else if (typeof(input) === 'number') {
            const newRange = [((pageSize * input) - pageSize), ((pageSize * input) - 1)];

            setCurrentPage(input);
            setPaginationRange(newRange);
        }
    }

    return (
        <div>
            <Pagination>
                <Pagination.Prev onClick={() => SwitchPage('down')} />
                {pages}
                <Pagination.Next onClick={() => SwitchPage('up')}/>
            </Pagination>
        </div>
    );
}

export default Paginator;