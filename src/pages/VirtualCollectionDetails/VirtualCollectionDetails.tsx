import { Badge, Card } from "@radix-ui/themes";
import { RetrieveEnvVariable } from "app/Utilities";
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";
import { Pagination } from "components/pagination/Pagination";
import { useVirtualCollectionDetails } from "hooks/useVirtualCollections";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paginateItems } from "utils/Pagination";

const VirtualCollectionDetails = () => {
    /* Base variables */
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 25;

    /* Calling the Virtual Collections hook */
    const { data, meta, isLoading, isError } = useVirtualCollectionDetails({ pageSize: maxPerPage, pageNumber: currentPage, virtualCollectionID: location.pathname.replace('/virtual-collections/', '')});
    console.log(data, meta, isLoading, isError);

    /* This will become more generic after migrating more services */
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    /* Use pagination */
    const { currentItems, totalAmount } = paginateItems(data, currentPage, maxPerPage, meta?.totalRecords);
    console.log(currentItems)
    return ( 
        <>
            <header>
                <h1>Virtual Collection Details</h1>
                <p className="subtitle">This is the Virtual Collection Details page.</p>
            </header>
            <main className="virtual-collections-main" id="mobile-view">
                <div className="gallery-container">
                    {currentItems?.map((collection: any) => {
                        return (
                            <Card variant="surface" className="gallery-card" key={collection.id} asChild>
                                <Link to={`/ds/${collection.id.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`} className="gallery-card">
                                    <Badge color="sky" variant="solid">{collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus']}</Badge>
                                    <p dangerouslySetInnerHTML={{__html: GetSpecimenNameHTMLLabel(collection.attributes)}}></p>
                                    <span>{collection.attributes['ods:hasEvents'][0]['ods:hasLocation']['dwc:country']}</span>
                                    <span> • </span>
                                    <span id="updated-date">{collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] ? collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] : 'Unknown'}</span>
                                    <p>{collection.attributes['dcterms:rightsHolder']}</p>
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
}

export default VirtualCollectionDetails;