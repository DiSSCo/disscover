/* Import dependencies */
import { RetrieveEnvVariable } from "app/Utilities";
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";
import { useState } from "react";
import { Link } from "react-router-dom";

/* Import components */
import { Badge, Card, Table } from "@radix-ui/themes";
import { Pagination } from "components/pagination/Pagination";

/* Import hooks */
import { useVirtualCollectionDetails } from "hooks/useVirtualCollections";

/* Import utils */
import { paginateItems } from "utils/Pagination";

/* Import styles */
import './VirtualCollectionDetails.scss';

const VirtualCollectionDetails = () => {
    /* Base variables */
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 25;

    /* Calling the Virtual Collections hook */
    const { data, meta, isLoading, isError } = useVirtualCollectionDetails({ pageSize: maxPerPage, pageNumber: currentPage, virtualCollectionID: location.pathname.replace('/virtual-collections/', '')});

    /* This will become more generic after migrating more services */
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    /* Use pagination */
    const { currentItems, totalAmount } = paginateItems(data, currentPage, maxPerPage, meta?.totalRecords);

    const tableRowHandler = (row: any) => {
        console.log(row);
    };

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
                        <Table.ColumnHeaderCell>Scientific name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Type status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Organisation</Table.ColumnHeaderCell>
                    </Table.Header>

                    <Table.Body>
                        {currentItems?.map((collection: any) => {
                            return (
                                <Table.Row key={collection.id} onClick={tableRowHandler}>
                                    <Table.RowHeaderCell>
                                        <p dangerouslySetInnerHTML={{__html: GetSpecimenNameHTMLLabel(collection.attributes)}}></p>
                                    </Table.RowHeaderCell>
                                    <Table.Cell>
                                        <p>{collection.attributes['ods:hasEvents'][0]['ods:hasLocation']['dwc:country']}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p id="updated-date">{collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] ? collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] : 'Unknown'}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                    { collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus'] && 
                                        <Badge color="sky" variant="solid">{collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus']}</Badge>}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{collection.attributes['dcterms:rightsHolder']}</p>
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