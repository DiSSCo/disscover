/* Import Dependencies */
import { Pagination } from "react-bootstrap";

/* Import Types */
import { Dict } from 'global/Types';


/* Props Typing */
interface Props {
    pageNumber: number,
    links: Dict,
    SetPageNumber: Function
};


const Paginator = (props: Props) => {
    const { pageNumber, links, SetPageNumber } = props;

    /* Base variables */
    let pages: JSX.Element[] = [];

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

                {pages}

                {'next' in links &&
                    <Pagination.Next onClick={() => SwitchPage('up')} />
                }
            </Pagination>
        </div>
    );
}

export default Paginator;