/* Import Dependencies */
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFocus } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import TaxonomySelect from './taxonomyFilter/TaxonomySelect';
import TaxonomicTree from './taxonomyFilter/TaxonomicTree';


/* Props Type */
type Props = {
    fieldValues: { [taxonomicLevel: string]: string[] },
    formValues: Dict,
    SetFieldValue: Function,
    SetFormValues: Function,
    SubmitForm: Function
};


/**
 * Component that renders the taxonomy filter
 * @param fieldValues The values of all of the taxonomy related fields in the form
 * @param formValues All of the form values
 * @param SetFieldValue Function to set a value of specific form field
 * @param SetFormValues Function to set all form values
 * @param SubmitForm Function to submit the form
 * @returns JSX Component
 */
const TaxonomyFilter = (props: Props) => {
    const { fieldValues, formValues, SetFieldValue, SetFormValues, SubmitForm } = props;

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
    const [taxonomicFilterTrigger, setTaxonomicFilterTrigger] = useState<boolean>(false);

    /* Set focus on taxonomy filter */
    const taxonomyFilterRef = useRef<HTMLDivElement>(null);
    useFocus({
        ref: taxonomyFilterRef,
        OnFocusLose: () => setTaxonomicFilterTrigger(false)
    });

    /* Class Names */
    const multiSelectListClass = classNames({
        "d-block": taxonomicFilterTrigger,
        "d-none": !taxonomicFilterTrigger
    });

    return (
        <div ref={taxonomyFilterRef}>
            {/* Taxonomic select */}
            <Row>
                <Col>
                    <TaxonomySelect fieldValues={fieldValues.species}
                        SetFieldValue={(field: string, value: string | string[]) => SetFieldValue(field, value)}
                        SubmitForm={SubmitForm}
                        ToggleTaxonomyFilter={(foo: boolean) => setTaxonomicFilterTrigger(foo ?? !taxonomicFilterTrigger)}
                    />
                </Col>
            </Row>
            {/* Taxonomic tree */}
            <Row className={`${multiSelectListClass} mt-2`}>
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