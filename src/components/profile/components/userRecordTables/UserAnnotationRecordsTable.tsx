/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Config */
import UserAnnotationRecordsTableConfig from "app/config/table/UserAnnotationRecordsTableConfig";

/* Import Hooks */
import { usePagination } from "app/Hooks";

/* Import API */
import GetCreatorAnnotations from "api/annotation/GetCreatorAnnotations";

/* Import Components */
import { Paginator } from "components/elements/Elements";
import { DataTable } from "components/elements/customUI/CustomUI";


/* User annotation record type */
type DataRow = {
    jsonPath: string,
    motivation: string,
    value: string | number | boolean
};


/**
 * Component that renders the user annotation records table on the profile page
 * @returns JSX Component
 */
const UserAnnotationRecordsTable = () => {
    /* Base variables */
    const { columns } = UserAnnotationRecordsTableConfig();
    const tableData: DataRow[] = [];

    const pagination = usePagination({
        pageSize: 25,
        Method: GetCreatorAnnotations
    });

    pagination.records.forEach(userAnnotation => {
        let jsonPath: string;

        if (userAnnotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:ClassSelector') {
            jsonPath = userAnnotation["oa:hasTarget"]["oa:hasSelector"]["ods:class"];
        } else if (userAnnotation["oa:hasTarget"]["oa:hasSelector"]?.["@type"] === 'ods:TermSelector') {
            jsonPath = userAnnotation["oa:hasTarget"]["oa:hasSelector"]["ods:term"];
        } else {
            jsonPath = 'Region of interest';
        }

        tableData.push({
            jsonPath,
            motivation: userAnnotation["oa:motivation"],
            value: userAnnotation["oa:hasBody"]["oa:value"][0]
        });
    });
    
    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
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

export default UserAnnotationRecordsTable;