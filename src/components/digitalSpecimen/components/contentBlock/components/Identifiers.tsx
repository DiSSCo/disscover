/* Import dependencies */
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

/* Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Config */
import IdentifiersTableConfig from 'app/config/table/IdentifiersTableConfig';

/* Import Components */
import { DataTable } from 'components/elements/customUI/CustomUI';

/* Data table row type */
type DataRow = {
    DOI: string,
};

/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
};

const Identifiers = (props: Props) => {
    const { digitalSpecimen } = props;

    console.log(digitalSpecimen);
    return (
        <div className="h-100">
            <Card>
            </Card>
        </div>
    )
}

export default Identifiers;