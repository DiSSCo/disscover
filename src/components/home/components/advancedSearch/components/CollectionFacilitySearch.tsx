/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getOrganisationNames } from 'redux-store/BootSlice';

/* Import Types */
import { Dict, DropdownItem } from 'app/Types';

/* Import Components */
import { Dropdown } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    formValues?: Dict,
    SetFieldValue?: (field: string, value: string) => Function
};


/**
 * Component that renders the collection facility search in the advanced search
 * @param formValues The values of the parent form
 * @param SetFieldValue Function to set a field value of the parent form
 * @returns JSX Component
 */
const CollectionFacilitySearch = (props: Props) => {
    const { formValues, SetFieldValue } = props;

    /* Base variables */
    const organisationNames = useAppSelector(getOrganisationNames);
    const collectionFacilityIDTypeDropdownItems: DropdownItem[] = [
        {
            label: 'Local Identifier',
            value: 'local'
        }
    ];

    return (
        <div>
            {/* Collection facility ID type */}
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <p className="fw-lightBold">Search by</p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={collectionFacilityIDTypeDropdownItems}
                                selectedItemValue={(formValues?.collectionFacilityIdType ?? 'local')}
                                styles={{
                                    background: '#ffffff',
                                    color: '#28bacb',
                                    border: true,
                                    borderRadius: "999px"
                                }}
                                OnChange={(item: DropdownItem) => SetFieldValue?.('collectionFacilityIdType', item.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Organisation name */}
            <Row className="mt-3">
                <Col>
                    <Row>
                        <Col>
                            <p className="fw-lightBold">Organisation hosting the collection facility</p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={organisationNames.map(organisationName => ({
                                label: organisationName,
                                value: organisationName
                            }))}
                                selectedItemValue={formValues?.organisationName}
                                styles={{
                                    background: '#ffffff',
                                    color: '#28bacb',
                                    border: true,
                                    borderRadius: "999px"
                                }}
                                OnChange={(item: DropdownItem) => SetFieldValue?.('organisationName', item.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CollectionFacilitySearch;