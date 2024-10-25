/* Import Dependencies */
import KeycloakService from 'app/Keycloak';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFetch } from 'app/Hooks';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { Dict } from 'app/Types';

/* Import Components */
import { MASOverview, MASScheduleMenu } from './MASMenuComponents';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    CloseMASMenu: Function,
    SetLoading: Function,
    GetMASs: Function,
    GetMASJobRecords: Function
    ScheduleMASs: Function
};


/**
 * Component that renders the MAS Menu for in the annotation side panel
 * @param superClass The selected super class
 * @param CloseMASMenu Function to close the MAS menu
 * @param SetLoading Function to set the loading state of the annotation side panel
 * @param GetMASs Function to fetch the potential MASs to be run
 * @param GetMASJobRecords Function that fetches the MAS job records
 * @param ScheduleMASs Function to schedule MASs
 * @returns JSX Component
 */
const MASMenu = (props: Props) => {
    const { superClass, CloseMASMenu, SetLoading, GetMASs, GetMASJobRecords, ScheduleMASs } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [mass, setMASs] = useState<MachineAnnotationService[]>([]);
    const [masJobRecords, setmasJobRecords] = useState<Dict[]>([]);
    const [scheduleMASMenuToggle, setScheduleMASMenuToggle] = useState<boolean>(false);

    /* OnLoad, fetch MAS job records */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'MASs',
                params: {
                    handle: superClass?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
                },
                Method: GetMASs
            },
            {
                alias: 'MASJobRecords',
                params: {
                    handle: superClass?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, ''),
                    pageSize: 10,
                    pageNumber: 1
                },
                Method: GetMASJobRecords
            }
        ],
        Handler: (results: {
            MASs: MachineAnnotationService[],
            MASJobRecords: {
                MASJobRecords: Dict[],
                links?: Dict
            }
        }) => {
            setMASs(results.MASs);
            setmasJobRecords(results.MASJobRecords.MASJobRecords);
        }
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Button to close the MAS menu */}
            <Row className="mb-3">
                <Col>
                    <Button type="button"
                        variant="blank"
                        className="px-0 py-0"
                        OnClick={() => CloseMASMenu()}
                    >
                        <p className="tc-primary fw-lightBold">
                            Exit
                        </p>
                    </Button>
                </Col>
                <Col lg="auto">
                    <Button type="button"
                        variant="secondary"
                        className="fs-5"
                        disabled={!KeycloakService.IsLoggedIn()}
                        OnClick={() => setScheduleMASMenuToggle(!scheduleMASMenuToggle)}
                    >
                        <p>
                            {!scheduleMASMenuToggle ? 'Schedule a MAS' : 'Cancel scheduling'}
                        </p>
                    </Button>
                </Col>
            </Row>
            <Row className="flex-grow-1">
                <Col>
                    {/* MAS overview and schedule menu */}
                    {scheduleMASMenuToggle ?
                        <MASScheduleMenu digitalObjectId={superClass['@id']}
                            mass={mass}
                            SetLoading={SetLoading}
                            ScheduleMASs={ScheduleMASs}
                            ReturnToOverview={() => setScheduleMASMenuToggle(false)}
                        />
                        : <MASOverview masJobRecords={masJobRecords} />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default MASMenu;