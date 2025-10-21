/* Import Dependencies */
import { Pagination } from "react-bootstrap";

/* Import Types */
import { PaginationObject } from "app/Types";


/* Props Type */
type Props = {
    pagination: PaginationObject
};


export const Paginator = (props: Props) => {
    const { pagination } = props;

    /* Base variables */
    const pages: JSX.Element[] = [];
    const pageNumbers: number[] = [];
    const currentPage: number = pagination.currentPage;
    const lastPage: number = pagination.lastPage;

    /* Generate Paginator Pages */
    for (let index = currentPage - 3; index <= currentPage + 1; index++) {
        /* Check if page is positive and not the last page */
        if (index > 0 && index <= 399 && index <= lastPage) {
            const pageIndex = index;

            /* Craft page JSX */
            const pageElement = <Pagination.Item key={pageIndex}
                active={pageIndex === (currentPage)}
                disabled={pagination.loading}
                onClick={() => pagination.GoToPage(pageIndex)}
            >
                {pageIndex}
            </Pagination.Item>;

            /* Add current and previous (3) page numbers */
            pages.push(pageElement);

            /* Push page index to page numbers */
            if (!(pageNumbers.includes(pageIndex))) {
                pageNumbers.push(pageIndex);
            };
        };
    };

    return (
        <div>
            <Pagination>
                {pagination.Previous &&
                    <Pagination.Prev disabled={pagination.loading}
                        onClick={() => pagination.Previous?.()}
                    />
                }

                {!pageNumbers.includes(1) &&
                    <>
                        <Pagination.Item key={1}
                            className="bgc-secondary-hard"
                            disabled={pagination.loading}
                            onClick={() => pagination.GoToPage(1)}
                        >
                            1
                        </Pagination.Item>

                        <Pagination.Item key={'dotsFirst'}
                            disabled={pagination.loading}
                        >
                            ...
                        </Pagination.Item>
                    </>
                }

                {pages}

                {(lastPage > 1 && !pageNumbers.includes(lastPage)) ?
                    <>
                        <Pagination.Item key={'dotsLast'}
                            disabled={pagination.loading}
                        >
                            ...
                        </Pagination.Item>

                        <Pagination.Item key={lastPage}
                            disabled={pagination.loading}
                            onClick={() => pagination.Last?.()}
                        >
                            {lastPage}
                        </Pagination.Item>
                    </>
                    : <> </>
                }

                {(pagination.Next && currentPage !== 399) &&
                    <Pagination.Next disabled={pagination.loading}
                        onClick={() => pagination.Next?.()}
                    />
                }
            </Pagination>
        </div>
    );
};
