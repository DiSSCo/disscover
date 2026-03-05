/* Import dependencies */
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";

/* Import components */
import { Badge, Table } from "@radix-ui/themes";
import { RetrieveEnvVariable } from "app/Utilities";
import { Link } from "react-router-dom";

type Props = {
    currentItems: any;
}

const VirtualCollectionDetailsTable = ({currentItems }: Props) => {
    /* Base variables */
    const columns = ['Scientific Name', 'Location', 'Year', 'Type status', 'Organisation'];

    return (
        <Table.Root size="2">
            <Table.Header>
                <Table.Row>
                    { columns.map((column: string) => {
                        return (
                            <Table.ColumnHeaderCell key={column}>{column}</Table.ColumnHeaderCell>
                        )
                    })}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {currentItems?.map((collection: any) => {
                    return (
                        <Table.Row key={collection.id} className="row-link">
                            <Table.RowHeaderCell>
                                {/* Accessible Link: Navigate via keyboard/click */}
                                <Link 
                                    className="header-cell-link"
                                    to={`/ds/${collection.id.replace(RetrieveEnvVariable('DOI_URL'), '')}`} 
                                >
                                    <span dangerouslySetInnerHTML={{__html: GetSpecimenNameHTMLLabel(collection.attributes)}} />
                                </Link>
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
    )
}

export default VirtualCollectionDetailsTable;