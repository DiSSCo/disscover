/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

/* Import Components */
import { CompareCollection, TitleCard } from './CompareDigitalSpecimenComponents';


/* Props Type */
type Props = {
    matrixData: {
        [collection: string]: {
            [field: string]: string[][]
        }
    },
    RemoveFromComparison: Function
};


/**
 * Component that renders the compare matrix on the compare digital specimen page
 * @param matrixData The matrix data used to render the compare collections and their fields
 * @param RemoveFromComparison Function that removes a digital specimen from comparison
 * @returns JSX Component
 */
const CompareMatrix = (props: Props) => {
    const { matrixData, RemoveFromComparison } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* If matrix data is still an empty object, show loading screen */}
            {!isEmpty(matrixData) &&
                <div className="h-100 overflow-scroll mt-3 pb-3">
                    {/* Render title cards for every compare digital specimen */}
                    <Row className="flex-nowrap position-sticky top-0 bgc-default pb-3 z-2">
                        {/* Empty col for row span and overflow scroll */}
                        <Col lg={{ span: 2 }}
                            className="position-sticky-left bgc-default"
                        />

                        {matrixData?.overview?.specimenName.map((specimenNameArray, index) => (
                            <Col key={`${specimenNameArray[0]}_${index}`}
                                lg={{ span: 3 }}
                                className="px-3"
                            >
                                <TitleCard digitalSpecimenId={matrixData?.overview?.DOI[index][0]}
                                    digitalSpecimenName={specimenNameArray[0]}
                                    RemoveFromComparison={RemoveFromComparison}
                                />
                            </Col>
                        ))}
                    </Row>
                    {/* Render matrix data */}
                    {Object.entries(matrixData).map(([collectionName, fields]) => (
                        <Row key={collectionName}
                            className="mb-3"
                        >
                            <Col>
                                <CompareCollection collectionName={collectionName}
                                    fields={fields}
                                />
                            </Col>
                        </Row>

                    ))}
                </div>
            }
        </div >
    );
};

export default CompareMatrix;