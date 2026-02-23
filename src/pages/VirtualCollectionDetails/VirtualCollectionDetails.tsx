/* Import dependencies */
import { RetrieveEnvVariable } from "app/Utilities";
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";
import { useState } from "react";
import { Link } from "react-router-dom";

/* Import components */
import { Badge, Card, Table } from "@radix-ui/themes";
import { Pagination } from "components/pagination/Pagination";

/* Import hooks */
import { useVirtualCollectionDetails, useSelectedVirtualCollection } from "hooks/useVirtualCollections";

/* Import utils */
import { paginateItems } from "utils/Pagination";

/* Import styles */
import './VirtualCollectionDetails.scss';
import { Hero } from "components/Hero/Hero";
import { format } from "date-fns";

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
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    /* Use pagination */
    const { currentItems, totalAmount } = paginateItems(collections, currentPage, maxPerPage, meta?.totalRecords);

    /**
     * Function to handle the row click
     * @param row The specific row object needed to navigate to the digital specimen page
     */
    const tableRowHandler = (row: any) => {
        console.log(row);
    };

    return ( 
        <>
            <Hero
                title={selectedVirtualCollection?.['ltc:collectionName']}
                // description={selectedVirtualCollection?.['ltc:description']}
                description="DiSSCover Virtual Collections showcase a diverse range of specimens from across Europe, presented in curated galleries. DiSSCover Virtual Collections showcase a diverse range of specimens from across Europe, presented in curated galleries. DiSSCover Virtual Collections showcase a diverse range of specimens from across Europe, presented in curated galleries."
                badge={[selectedVirtualCollection?.['ltc:basisOfScheme']]}
                navigateTo={{pathName: '/virtual-collections', text: 'Virtual Collections'}}
                share={true}
                details={selectedVirtualCollection}
            >
                
            </Hero>
            <main className="virtual-collections-main" id="mobile-view">
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
                <Pagination
                    totalAmount={totalAmount}
                    onPageChange={(page) => setCurrentPage(page)}
                    currentPage={currentPage}
                    maxPerPage={maxPerPage}
                    content="collections"
                />
            </main>
            <main id="desktop-view" className="virtual-collections-main">
                <Table.Root size="2">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Scientific name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Type status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Organisation</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {currentItems?.map((collection: any) => {
                            return (
                                <Table.Row key={collection.id} onClick={tableRowHandler}>
                                    <Table.RowHeaderCell>
                                        <span dangerouslySetInnerHTML={{__html: GetSpecimenNameHTMLLabel(collection.attributes)}}></span>
                                    </Table.RowHeaderCell>
                                    <Table.Cell>
                                        <span>{collection.attributes['ods:hasEvents'][0]['ods:hasLocation']['dwc:country']}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span id="updated-date">{collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] ? collection.attributes['ods:hasEvents'][0]['dwc:eventDate'].split('-')[0].trim() : 'Unknown'}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                    { collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus'] && 
                                        <Badge color="sky" variant="solid">{collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus']}</Badge>}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>{collection.attributes['dcterms:rightsHolder']}</span>
                                    </Table.Cell>
                                </Table.Row>
                                
                            )
                        }
                    )}
                    </Table.Body>
                </Table.Root>
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