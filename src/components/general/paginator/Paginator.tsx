/* Import Dependencies */
import { useSearchParams, useLocation } from "react-router-dom";
import { Pagination } from "react-bootstrap";

/* Import Store */
import { useAppDispatch } from "app/hooks";
import { setPaginationObject } from "redux/general/GeneralSlice";

/* Import Types */
import { Dict } from 'app/Types';


/* Props Typing */
interface Props {
    pageNumber: number,
    links: Dict,
    totalRecords?: number,
    SetPageNumber: Function
};


const Paginator = (props: Props) => {
    const { pageNumber, links, totalRecords, SetPageNumber } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    /* Base variables */
    const pageNumbers: number[] = [];
    let pages: JSX.Element[] = [];
    let lastPage = totalRecords && Math.ceil(totalRecords / 25);

    /* Function for setting Pagination Object */
    const SetPaginationObject = (pageNumber: number) => {
        const page = location.pathname.split('/')[1];
        const filters = [];

        for (const filterEntry of searchParams.entries()) {
            filters.push(filterEntry);
        }

        dispatch(setPaginationObject({
            page,
            pageNumber,
            filters
        }))
    }

    /* Function for switching a Paginator Page */
    const SwitchPage = (input: string | number = 1) => {
        if (String(input) === 'up') {
            SetPageNumber(pageNumber + 1);

            SetPaginationObject(pageNumber + 1);
        } else if (String(input) === 'down' && pageNumber > 1) {
            SetPageNumber(pageNumber - 1);

            SetPaginationObject(pageNumber - 1);
        } else if (typeof (input) === 'number') {
            SetPageNumber(input);

            SetPaginationObject(input);
        }
    }

    /* Last page cannot be greater than 399 */
    if (lastPage && lastPage > 399) {
        lastPage = 399;
    }

    /* Function for pushing pages to the Paginator */
    const PushToPages = (page: number) => {
        pages.push(
            <Pagination.Item key={page}
                active={page === pageNumber}
                onClick={() => SwitchPage(page)}
            >
                {page}
            </Pagination.Item>
        );

        pageNumbers.push(page);
    }

    /* Generate Paginator Pages */
    for (let i = 0; i < pageNumber; i++) {
        const page = i + 1;

        /* Add current and previous (3) page numbers */
        if (pageNumber > 4) {
            if ((page >= (pageNumber - 3) && page <= pageNumber)) {
                PushToPages(page);
            }
        } else {
            PushToPages(page)
        }
    }

    /* Add next page number if present */
    if ('next' in links && pageNumber !== 399) {
        PushToPages(pageNumber + 1);
    }

    return (
        <div>
            <Pagination>
                {'prev' in links &&
                    <Pagination.Prev onClick={() => SwitchPage('down')} />
                }

                {!pageNumbers.includes(1) &&
                    <>
                        <Pagination.Item key={1}
                            onClick={() => SwitchPage(1)}
                        >
                            1
                        </Pagination.Item>

                        <Pagination.Item key={'dotsFirst'}>
                            ...
                        </Pagination.Item>
                    </>
                }

                {pages}

                {(lastPage && lastPage > 1 && !pageNumbers.includes(lastPage)) ?
                    <>
                        <Pagination.Item key={'dotsLast'}>
                            ...
                        </Pagination.Item>

                        <Pagination.Item key={lastPage}
                            onClick={() => SwitchPage(lastPage)}
                        >
                            {lastPage}
                        </Pagination.Item>
                    </>
                    : <> </>
                }

                {('next' in links && pageNumber !== 399) &&
                    <Pagination.Next onClick={() => SwitchPage('up')} />
                }
            </Pagination>
        </div>
    );
}

export default Paginator;