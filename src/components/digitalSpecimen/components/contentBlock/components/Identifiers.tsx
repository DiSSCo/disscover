/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';

/* Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

/* Import Components */
import { DataTable } from 'components/elements/customUI/CustomUI';

/* Import Config */
import IdentifiersTableConfig from 'app/config/table/IdentifiersTableConfig';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
};

/* Identifier key value pair type */
type DataRow = {
    key: string | undefined,
    value: string | undefined
};

const Identifiers = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Data table configuration */
    const { columns } = IdentifiersTableConfig();

    /* Set Table data with different identifiers */
    const tableData: DataRow[] = [];

    tableData.push({
        key: 'DOI',
        value: digitalSpecimen['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
    });

    digitalSpecimen['ods:hasIdentifiers']?.forEach((identifier) => {
        tableData.push({
            key: identifier['dcterms:type'],
            value: identifier['@id']
        });
    });

    return (
        <div className="h-100">
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <p className="fs-2 fw-lightBold">Identifiers</p>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <DataTable columns={columns}
                                data={tableData}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Identifiers;