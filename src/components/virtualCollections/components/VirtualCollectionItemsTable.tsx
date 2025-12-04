/* Import Dependencies */
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

/* Import Config */
import VirtualCollectionDetailsTableConfig from "app/config/table/VirtualCollectionDetailsTableConfig";

/* Import Components */
import { DataTable } from "components/elements/customUI/CustomUI";
import { Paginator } from "components/elements/Elements";
import { RetrieveEnvVariable } from "app/Utilities";

/* Import API */
import GetAllVirtualCollectionItems from "api/virtualCollections/GetAllVirtualCollectionItems";

/* Import Hooks */
import { usePagination } from "app/Hooks";

/* User annotation record type */
type DataRow = {
    name: string,
    doi: string,
    country: string,
    dateCreated: string
};

/**
 * Component that renders the user annotation records table on the profile page
 * @returns JSX Component
 */
const VirtualCollectionItemsTable = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const { columns } = VirtualCollectionDetailsTableConfig();
    const tableData: DataRow[] = [];

    /*  */
    const pagination = usePagination({
        pageSize: 25,
        params: {
            virtualCollectionID: location.pathname.replace('/virtual-collections/', ''),
        },
        resultKey: 'digitalSpecimens',
        Method: GetAllVirtualCollectionItems
    });

    /*  */
    for (const virtualCollection of pagination.records) {
        tableData.push({
            name: virtualCollection['ods:hasIdentifications'][0]['ods:hasTaxonIdentifications'][0]['dwc:scientificName'],
            doi: virtualCollection['@id'],
            country: virtualCollection['ods:hasEvents'][0]['ods:hasLocation']['dwc:country'],
            dateCreated: virtualCollection['ods:hasEvents'][0]['dwc:eventDate']
        });
    }

    const handleDigitalSpecimenSelect = (digitalSpecimen: { doi: string, name: string, country: string, dateCreated: string }) => {
        const handle = digitalSpecimen.doi.replace(RetrieveEnvVariable('DOI_URL'), '');

        // Navigate to the specific digital specimen
        navigate(`/ds/${handle}`);
    };
    
    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-auto">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
                            SelectAction={(e: any) => handleDigitalSpecimenSelect(e)}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <Paginator pagination={pagination} />
                </Col>
            </Row>
        </div>
    );
};

export default VirtualCollectionItemsTable;