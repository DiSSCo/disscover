/* Import Dependencies */
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch, useAppSelector, useFetch } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget, setAnnotationTarget } from 'redux-store/AnnotateSlice';
import { getAnnotationWizardToggle, getMasMenuToggle } from 'redux-store/TourSlice';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { Dict, SuperClass } from 'app/Types';

/* Import Styles */
import styles from './annotationSidePanel.module.scss';

/* Import Components */
import { AnnotationsOverview, AnnotationPolicyText, AnnotationWizard, MasMenu, TopBar } from './AnnotationSidePanelComponents';
import { LoadingScreen } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: SuperClass,
    schema: Dict,
    annotationCases: {
        name: string;
        type: string;
        jsonPath: string;
        icon: string;
    }[],
    GetAnnotations: Function,
    GetMas: Function,
    GetMasJobRecords: Function,
    ScheduleMas: Function,
    HideAnnotationSidePanel: Function
};


/**
 * Component that renders the annotation side panel
 * @param superClass The super class reigning the annotation side panel
 * @param schema The base schema of the selected super class
 * @param annotationCases Default annotation cases that can be selected as the annotation target
 * @param GetAnnotations Function that fetches the annotations of the super class
 * @param GetMas Function that fetches the potential MASs to be run
 * @param GetMasJobRecords Function that fetches the MAS job records of the super class
 * @param ScheduleMas Function to schedule MASs
 * @param HideAnnotationSidePanel Function to hide the annotation side panel
 * @returns JSX Component
 */
const AnnotationSidePanel = (props: Props) => {
    const { superClass, schema, annotationCases, GetAnnotations, GetMas, GetMasJobRecords, ScheduleMas, HideAnnotationSidePanel } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const fetch = useFetch();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
    const tourAnnotationWizardToggle = useAppSelector(getAnnotationWizardToggle);
    const tourMasMenuToggle = useAppSelector(getMasMenuToggle);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [annotationWizardToggle, setAnnotationWizardToggle] = useState<boolean>(false);
    const [masMenuToggle, setMasMenuToggle] = useState<boolean>(false);
    const [policyTextToggle, setPolicyTextToggle] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterSortValues, setFilterSortValues] = useState<{
        motivation: string,
        sortBy: string
    }>({
        motivation: '',
        sortBy: 'dateLatest'
    });

    /* OnLoad: fetch annotations of super class with provided method */
    fetch.Fetch({
        params: {
            handle: superClass?.['@id'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        triggers: [superClass, annotationWizardToggle],
        Method: GetAnnotations,
        Handler: (annotations: Annotation[]) => {
            setAnnotations(annotations);
        }
    });

    /**
     * Function for refreshing the annotations in the side panel by fetching fresh data from the API
     */
    const RefreshAnnotations = async () => {
        setLoading(true);

        const annotations = await GetAnnotations({
            handle: superClass?.['@id'].replace(import.meta.env.VITE_DOI_URL, '')
        });

        setAnnotations(annotations);
        setLoading(false);
    };

    /* Class Names */
    const policyTextClass = classNames({
        'd-none': !policyTextToggle
    });

    const loadingScreenClass = classNames({
        'z-2': loading
    });

    return (
        <div className={`tourAnnotate4 tourAnnotate7 tourAnnotate8 tourAnnotate10 tourAnnotate13 tourAnnotate17 tourMas5
            ${styles.annotationSidePanel} h-100 w-100 position-relative d-flex flex-column bgc-default px-4 py-4`}
        >
            {/* Top bar */}
            <Row>
                <Col>
                    <TopBar HideAnnotationSidePanel={HideAnnotationSidePanel}
                        RefreshAnnotations={RefreshAnnotations}
                        ShowPolicyText={() => setPolicyTextToggle(true)}
                    />
                </Col>
            </Row>
            {/* Annotations overview or wizard depending on state */}
            <Row className="flex-grow-1 overflow-hidden mt-4">
                <Col className="h-100">
                    {((annotationWizardToggle || tourAnnotationWizardToggle) && superClass) ?
                        <AnnotationWizard schema={schema}
                            superClass={superClass}
                            annotationCases={annotationCases}
                            StopAnnotationWizard={() => {
                                setAnnotationWizardToggle(false);
                                setLoading(false);

                                if (annotationTarget?.annotation) {
                                    dispatch(setAnnotationTarget({
                                        ...annotationTarget,
                                        annotation: undefined
                                    }));
                                }
                            }}
                            SetLoading={(loading: boolean) => setLoading(loading)}
                            SetFilterSortValues={setFilterSortValues}
                        />
                        : <>
                            {((masMenuToggle || tourMasMenuToggle) && superClass) ? <MasMenu superClass={superClass}
                                CloseMasMenu={() => setMasMenuToggle(false)}
                                SetLoading={setLoading}
                                GetMas={GetMas}
                                GetMasJobRecords={GetMasJobRecords}
                                ScheduleMas={ScheduleMas}
                            />
                                : <AnnotationsOverview annotations={annotations}
                                    annotationTarget={annotationTarget}
                                    filterSortValues={filterSortValues}
                                    schemaTitle={schema.title}
                                    SetFilterSortValues={setFilterSortValues}
                                    StartAnnotationWizard={() => setAnnotationWizardToggle(true)}
                                    RefreshAnnotations={RefreshAnnotations}
                                    OpenMasMenu={() => setMasMenuToggle(true)}
                                    ShowPolicyText={() => setPolicyTextToggle(true)}
                                />
                            }
                        </>
                    }
                </Col>
            </Row>
            {/* Annotation policy text */}
            <div className={`${policyTextClass} position-absolute top-0 start-0 h-100 w-100 bgc-dark-opacity z-2`}>
                <AnnotationPolicyText HidePolicyText={() => setPolicyTextToggle(false)} />
            </div>
            {/* Loading screen */}
            <LoadingScreen visible={loading}
                displaySpinner={true}
                className={`${loadingScreenClass} position-absolute top-0 start-0 h-100 w-100`}
            />
        </div>
    );
};

export default AnnotationSidePanel;