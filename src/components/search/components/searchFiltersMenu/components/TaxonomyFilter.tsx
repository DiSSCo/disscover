/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAggregations } from 'redux-store/BootSlice';

/* Import Components */
import TaxonomySelect from './taxonomyFilter/TaxonomySelect';
import TaxonomicTree from './taxonomyFilter/TaxonomicTree';


/* Props Type */
type Props = {
    fieldValues: { [taxonomicLevel: string]: string[] },
    aggregations?: { [taxonomicLevel: string]: { [aggregation: string]: number } },
    SubmitForm: Function
};


/**
 * 
 * @param props 
 * @returns 
 */
const TaxonomyFilter = (props: Props) => {
    const { fieldValues, aggregations, SubmitForm } = props;

    /* Base variables */
    const [taxonomicRegistration, setTaxonomicRegistration] = useState<{
        [taxonomicLevel: string]: string[]
    }>({
        kingdom: [],
        phylum: [],
        class: [],
        order: [],
        family: [],
        genus: [],
        species: []
    });

    return (
        <div>
            {/* Taxonomic select */}
            <Row>
                <Col>
                    <TaxonomySelect fieldValues={[]}
                        SetFieldValue={() => {}}
                        SubmitForm={SubmitForm}
                    />
                </Col>
            </Row>
            {/* Taxonomic tree */}
            <Row>
                <Col>
                    <TaxonomicTree 
                        fieldValues={fieldValues}
                        taxonomicRegistration={taxonomicRegistration}
                        aggregations={aggregations}
                        SetTaxonomicRegistration={setTaxonomicRegistration}
                        OnSelect={SubmitForm}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TaxonomyFilter;