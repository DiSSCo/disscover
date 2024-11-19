/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { SourceSystem } from 'app/types/SourceSystem';
import { Dict, DropdownItem } from 'app/Types';

/* Import Components */
import { Dropdown, InputField } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    sourceSystems: SourceSystem[],
    formValues?: Dict,
    SetFieldValue?: (field: string, value: string) => Function
};


/**
 * Component that renders the physical specimen ID search in the advanced search
 * @param sourceSystems The found source systems from the orchestration API
 * @param formValues The values of the parent form
 * @param SetFieldValue Function for setting a field value in the parent form
 * @returns JSX Component
 */
const PhysicalSpecimenIDSearch = (props: Props) => {
    const { sourceSystems, formValues, SetFieldValue } = props;

    /* Base variables */
    const physicalSpecimenIDTypeDropdownItems: DropdownItem[] = [
        {
            label: "Global Unique Identifier",
            value: "global"
        },
        {
            label: "Local Identifier",
            value: "local"
        }
    ];

    return (
        <div>
            {/* Description */}
            <Row>
                <Col>
                    <p className="fs-4">
                        A physical specimen ID is the identifier associated with the physical object, usually as a barcode.
                        This can be a globally unique identifier, such as a CETAF identifier, DOI, or IGSN number,
                        or a local identifier such as an institutional catalog number.
                    </p>
                </Col>
            </Row>
            {/* Physical specimen ID type field */}
            <Row className="mt-4">
                <Col>
                    <Row>
                        <Col>
                            <p className="fw-lightBold">Search by</p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={physicalSpecimenIDTypeDropdownItems}
                                selectedItem={{
                                    label: physicalSpecimenIDTypeDropdownItems.find(item => item.value === formValues?.physicalSpecimenIdType)?.label ?? 'global',
                                    value: formValues?.physicalSpecimenIdType ?? 'global'
                                }}
                                styles={{
                                    background: '#ffffff',
                                    color: '#28bacb',
                                    border: true,
                                    borderRadius: "999px"
                                }}
                                OnChange={(item: DropdownItem) => SetFieldValue?.('physicalSpecimenIdType', item.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* If physical specimen id type is local: show option to choose local source system */}
            {formValues?.physicalSpecimenIdType === 'local' &&
                <Row className="mt-3">
                    <Col>
                        <Row>
                            <Col>
                                <p className="fw-lightBold">Source System hosting the specimen</p>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col>
                                <Dropdown items={sourceSystems.map(sourceSystem => ({
                                    label: sourceSystem['schema:name'] ?? sourceSystem['@id'] ?? '',
                                    value: sourceSystem['@id'] ?? ''
                                }))}
                                    selectedItem={{
                                        label: sourceSystems.find(sourceSystem => sourceSystem['@id'] === formValues?.sourceSystemId)?.['schema:name']
                                            ?? formValues?.sourceSystemId,
                                        value: formValues?.sourceSystemId
                                    }}
                                    styles={{
                                        background: '#ffffff',
                                        color: '#28bacb',
                                        border: true,
                                        borderRadius: "999px"
                                    }}
                                    OnChange={(item: DropdownItem) => SetFieldValue?.('sourceSystemId', item.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            {/* Identifier input */}
            <Row className="mt-3">
                <Col>
                    <Row>
                        <Col>
                            <p className="fw-lightBold">{`${formValues?.physicalSpecimenIdType === 'global' ? 'Global Unique' : 'Local'} Identifier`}</p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <InputField name="normalisedPhysicalSpecimenId"
                                placeholder={formValues?.physicalSpecimenIdType === 'global' ? 'https://geocollections.info/specimen/304790' : ''}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default PhysicalSpecimenIDSearch;