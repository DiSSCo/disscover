/* Import Dependencies */
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

/* Import Config */
import VirtualCollectionDetailsTableConfig from "app/config/table/VirtualCollectionDetailsTableConfig";

/* Import Components */
import { DataTable } from "components/elements/customUI/CustomUI";
import { Paginator } from "components/elements/Elements";
import { RetrieveEnvVariable } from "app/Utilities";

/* User annotation record type */
type DataRow = {
    name: string,
    doi: string,
    country: string,
    dateCreated: string
};

type Props = {
    pagination?: any
}

/**
 * Component that renders the user annotation records table on the profile page
 * @returns JSX Component
 */
const VirtualCollectionItemsTable = (props: Props) => {
    const { pagination } = props;
    const navigate = useNavigate();

    /* Base variables */
    const { columns } = VirtualCollectionDetailsTableConfig();
    const tableData: DataRow[] = [];

    pagination?.records?.digitalSpecimens?.forEach((virtualCollection: any) => {
        tableData.push({
            name: virtualCollection['ods:hasIdentifications'][0]['ods:hasTaxonIdentifications'][0]['dwc:scientificName'],
            doi: virtualCollection['@id'],
            country: virtualCollection['ods:hasEvents'][0]['ods:hasLocation']['dwc:country'],
            dateCreated: virtualCollection['ods:hasEvents'][0]['dwc:eventDate']
        });
    });

    const handleRowClick = (digitalSpecimen: { doi: string, name: string, country: string, dateCreated: string }) => {
        const handle = digitalSpecimen.doi.replace(RetrieveEnvVariable('DOI_URL'), '');
        navigate(`/ds/${handle}`);
    };
    
    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-auto">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
                            SelectAction={(e: any) => handleRowClick(e)}
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