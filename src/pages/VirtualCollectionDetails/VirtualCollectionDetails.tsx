/* Import dependencies */
import { useState } from "react";
import { Link } from "react-router-dom";

/* Import components */
import VirtualCollectionDetailsTable from "components/Tables/VirtualCollectionDetailsTable";
import { Pagination } from "components/Pagination/Pagination";
import { Hero } from "components/Hero/Hero";
import { Badge, Card } from "@radix-ui/themes";

/* Import hooks */
import { useVirtualCollectionDetails, useSelectedVirtualCollection } from "hooks/useVirtualCollections";

/* Import utils */
import { paginateItems } from "utils/Pagination";
import { RetrieveEnvVariable } from "app/Utilities";
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";

/* Import styles */
import './VirtualCollectionDetails.scss';

/**
 * Base component for the Virtual Collection Details page
 * @returns JSX component
 */
const VirtualCollectionDetails = () => {
    /* Base variables */
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 25;

    /* Calling the Virtual Collection Details hook */
    const { 
        data: collections, 
        meta, 
        isLoading: isLoadingCollections, 
        isError: isErrorCollections 
    } = useVirtualCollectionDetails({ 
        pageSize: maxPerPage, 
        pageNumber: currentPage, 
        virtualCollectionID: location.pathname.replace('/virtual-collections/', '')
    });
    
    /* Calling the Selected Virtual Collection hook */
    const { 
        data: selectedVC, 
        isLoading: isLoadingSelected, 
        isError: isErrorSelected 
    } = useSelectedVirtualCollection({ 
        identifier: location.pathname.replace('/virtual-collections/', '')
    });
    
    /* Response variables */
    const isLoading = isLoadingCollections || isLoadingSelected;
    const isError = isErrorCollections || isErrorSelected;
    const selectedVirtualCollection = selectedVC?.attributes;

    /* This will become more generic after migrating more services */
    if (isLoading) return <main><p>Retrieving the Virtual Collection Details...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collection Details. Please try again later.</p></main>;

    /* Use pagination */
    const { currentItems, totalAmount } = paginateItems(collections, currentPage, maxPerPage, meta?.totalRecords);

    return ( 
        <>
            <Hero
                title={selectedVirtualCollection?.['ltc:collectionName']}
                description={selectedVirtualCollection?.['ltc:description']}
                badge={[{ content: selectedVirtualCollection?.['ltc:basisOfScheme'], type: 'solid'}]}
                navigateTo={{pathName: '/virtual-collections', text: 'Virtual Collections'}}
                showShareButton={true}
                details={selectedVirtualCollection}
            >
                
            </Hero>
            { currentItems.length > 0 ?
            <main className="virtual-collections-main">
                <div id="vc-mobile-view">
                    <div className="gallery-container">
                        {currentItems?.map((collection: any) => {
                            return (
                                <Card variant="surface" className="gallery-card" key={collection.id} asChild>
                                    <Link to={`/ds/${collection.id.replace(RetrieveEnvVariable('DOI_URL'), '')}`} className="gallery-card">
                                        { collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus'] && 
                                        <Badge color="sky" variant="solid">{collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus']}</Badge>}
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
                </div>
                <div id="vc-desktop-view">
                    <VirtualCollectionDetailsTable 
                        currentItems={currentItems}
                    />
                </div>
                <Pagination
                    totalAmount={totalAmount}
                    onPageChange={(page) => setCurrentPage(page)}
                    currentPage={currentPage}
                    maxPerPage={maxPerPage}
                    content="collections"
                />
            </main>
            : <main>
                <p>This Virtual Collection is currently empty.</p>
            </main>
            }
        </>
    );
}

export default VirtualCollectionDetails;