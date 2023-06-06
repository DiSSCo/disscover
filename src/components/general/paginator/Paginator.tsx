/* Import Dependencies */
import { Pagination } from "react-bootstrap";

/* Import Types */
import { Dict } from 'global/Types';


/* Props Typing */
interface Props {
    pageNumber: number,
    links: Dict,
    totalRecords?: number,
    SetPageNumber: Function
};


const Paginator = (props: Props) => {
    const { pageNumber, links, totalRecords, SetPageNumber } = props;

    /* Base variables */
    let pages: JSX.Element[] = [];
    const pageNumbers: number[] = [];
    let lastPage = totalRecords && Math.ceil(totalRecords / 25);

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
    if ('next' in links) {
        PushToPages(pageNumber + 1);
    }

    /* Function for switching a Paginator Page */
    const SwitchPage = (input: string | number = 1) => {
        if (String(input) === 'up') {
            SetPageNumber(pageNumber + 1);
        } else if (String(input) === 'down' && pageNumber > 1) {
            SetPageNumber(pageNumber - 1);
        } else if (typeof (input) === 'number') {
            SetPageNumber(input);
        }
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

                {'next' in links &&
                    <Pagination.Next onClick={() => SwitchPage('up')} />
                }
            </Pagination>
        </div>
    );
}

export default Paginator;