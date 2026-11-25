/* Import dependencies */
import { useState } from "react";

/* Import components */
import { SearchHeader } from "components/Headers/SearchHeader"
import { Pagination } from "components/Pagination/Pagination";
import DigitalSpecimensTable from "components/Tables/DigitalSpecimensTable";

/* Import hooks */
import { useDigitalSpecimens } from "hooks/useDigitalSpecimen";
import { useSearchFilters } from "hooks/useSearchFilters";

/* Import utils */
import { paginateItems } from "utils/Utils";

export const Search = () => {
    /* Base variables */
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 100;

    /* Hooks */
    const { searchFilters } = useSearchFilters();
    const { data: allDigitalSpecimens, meta } = useDigitalSpecimens({ pageSize: maxPerPage, pageNumber: currentPage, searchFilters });

    /* Use pagination */
    const { currentItems, totalAmount } = paginateItems(allDigitalSpecimens, currentPage, maxPerPage, meta?.totalRecords);

    return (
        <>
            <SearchHeader></SearchHeader>
            <main>
                <section>
                    <DigitalSpecimensTable currentItems={currentItems}></DigitalSpecimensTable>
                </section>
                <section>
                    <Pagination
                        totalAmount={totalAmount}
                        onPageChange={(page) => setCurrentPage(page)}
                        currentPage={currentPage}
                        maxPerPage={maxPerPage}
                        content="items"
                    />
                </section>
            </main>
        </>
    )
}