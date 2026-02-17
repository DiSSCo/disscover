/* Import dependencies */
import { format } from "date-fns";
import { RetrieveEnvVariable } from "app/Utilities";
import { Link } from "react-router-dom";

/* Import components */
import { Badge, Card } from "@radix-ui/themes";

/* Import styling */
import './VirtualCollectionsOverview.scss';

/* Import hooks */
import { useVirtualCollections } from "hooks/useVirtualCollections";
import { Pagination } from "components/pagination/Pagination";
import { useState } from "react";
import { paginateItems } from "utils/Pagination";

/**
 * Base component that renders the Virtual Collections page
 * @returns JSX Component
 */
const VirtualCollections = () => {
    /* Calling the Virtual Collections hook */
    const { data, isLoading, isError } = useVirtualCollections();

    /* Base variables */
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 24;

    /* This will become more generic after migrating more services */
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    const { currentItems, totalAmount } = paginateItems(data, currentPage, maxPerPage);

    return (
        <>
            <header>
                <h1>Virtual Collections</h1>
                <p className="subtitle">DiSSCover Virtual Collections showcase a diverse range of specimens from across Europe, presented in curated galleries. </p>
            </header>
            <main>
                <div className="gallery-container">
                    {currentItems?.map((collection: any) => {
                        return (
                            <Card variant="surface" className="gallery-card" key={collection.id} asChild>
                                <Link to={`/virtual-collections/${collection.id.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`} className="gallery-card">
                                    <Badge color="sky" variant="solid">{collection.attributes['ltc:basisOfScheme']}</Badge>
                                    <p>{collection.attributes['ltc:collectionName']}</p>
                                    <span id="updated-date">Updated: {collection.attributes['schema:dateModified'] ? format(collection.attributes['schema:dateModified'], 'yyyy-MM-dd') : 'Unknown'}</span>
                                </Link>
                            </Card>
                        )
                    })}
                </div>
                <Pagination
                    totalAmount={totalAmount}
                    onPageChange={(page) => setCurrentPage(page)}
                    currentPage={currentPage}
                    maxPerPage={maxPerPage}
                    content="collections"
                />
            </main> 
        </>
    );
};

export default VirtualCollections;