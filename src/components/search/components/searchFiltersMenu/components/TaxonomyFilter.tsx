/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAggregations } from 'redux-store/BootSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import TaxonomySelect from './taxonomyFilter/TaxonomySelect';
import TaxonomicTree from './taxonomyFilter/TaxonomicTree';


/* Props Type */
type Props = {
    fieldValues: { [taxonomicLevel: string]: string[] },
    formValues: Dict,
    SetFormValues: Function,
    SubmitForm: Function
};


/**
 * 
 * @param props 
 * @returns 
 */
const TaxonomyFilter = (props: Props) => {
    const { fieldValues, formValues, SetFormValues, SubmitForm } = props;

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
                        formValues={formValues}
                        SetTaxonomicRegistration={setTaxonomicRegistration}
                        SetFormValues={SetFormValues}
                        OnSelect={SubmitForm}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TaxonomyFilter;