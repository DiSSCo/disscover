/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Hooks */
import { useAppSelector, useFetch } from 'app/Hooks';

/* Import Store */
import { getMasScheduleMenuToggle } from 'redux-store/TourSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { Dict } from 'app/Types';

/* Import Components */
import { MasOverview, MasScheduleMenu } from './MasMenuComponents';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | Dict,
    CloseMasMenu: Function,
    SetLoading: Function,
    SetLoadingText: Function,
    GetMas: Function,
    GetMasJobRecords: Function
    ScheduleMas: Function
};


/**
 * Component that renders the MAS Menu for in the annotation side panel
 * @param superClass The selected super class
 * @param CloseMasMenu Function to close the MAS menu
 * @param SetLoading Function to set the loading state of the annotation side panel
 * @param SetLoadingText Function to set the loading text of the annotation side panel
 * @param GetMas Function to fetch the potential MASs to be run
 * @param GetMasJobRecords Function that fetches the MAS job records
 * @param ScheduleMas Function to schedule MASs
 * @returns JSX Component
 */
const MASMenu = (props: Props) => {
    const { superClass, CloseMasMenu, SetLoading, SetLoadingText, GetMas, GetMasJobRecords, ScheduleMas } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const tourMasScheduleMenuToggle = useAppSelector(getMasScheduleMenuToggle);
    const [mass, setMass] = useState<MachineAnnotationService[]>([]);
    const [scheduleMasMenuToggle, setScheduleMasMenuToggle] = useState<boolean>(false);

    /* OnLoad, fetch MAS job records */
    fetch.Fetch({
        params: {
            handle: superClass?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
        },
        Method: GetMas,
        Handler: (mass: MachineAnnotationService[]) => {
            setMass(mass);
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
                        OnClick={() => CloseMasMenu()}
                    >
                        <p className="tc-primary fw-lightBold">
                            {'< Back to annotations'}
                        </p>
                    </Button>
                </Col>
            </Row>
            <Row className="flex-grow-1 overflow-hidden">
                <Col className="h-100">
                    {/* MAS overview and schedule menu */}
                    {(scheduleMasMenuToggle || tourMasScheduleMenuToggle) ?
                        <MasScheduleMenu digitalObjectId={superClass['@id']}
                            mass={mass}
                            SetLoading={SetLoading}
                            SetLoadingText={SetLoadingText}
                            ScheduleMas={ScheduleMas}
                            ReturnToOverview={() => setScheduleMasMenuToggle(false)}
                        />
                        : <MasOverview digitalObjectId={superClass['@id']}
                            GetMasJobRecords={GetMasJobRecords}
                            ScheduleMasMenu={() => setScheduleMasMenuToggle(!scheduleMasMenuToggle)}
                        />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default MASMenu;