/* Import Dependencies */
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch, useAppSelector, useFetch } from 'app/Hooks';

/* Import Store */
import { getAnnotationTarget, setAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { Dict, SuperClass } from 'app/Types';

/* Import Styles */
import styles from './annotationSidePanel.module.scss';

/* Import Components */
import { AnnotationsOverview, AnnotationPolicyText, AnnotationWizard, MASMenu, TopBar } from './AnnotationSidePanelComponents';
import { LoadingScreen } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: SuperClass | undefined,
    schema: Dict,
    GetAnnotations: Function,
    GetMASs: Function,
    GetMASJobRecords: Function,
    ScheduleMASs: Function,
    HideAnnotationSidePanel: Function
};


/**
 * Component that renders the annotation side panel
 * @param annotationMode Boolean indicating if the annotation mode is on or not
 * @param superClass The super class reigning the annotation side panel
 * @param GetAnnotations Function that fetches the annotations of the super class
 * @param GetMASs Function that fetches the potential MASs to be run
 * @param GetMASJobRecords Function that fetches the MAS job records of the super class
 * @param ScheduleMASs Function to schedule MASs
 * @param HideAnnotationSidePanel Function to hide the annotation side panel
 * @returns JSX Component
 */
const AnnotationSidePanel = (props: Props) => {
    const { superClass, schema, GetAnnotations, GetMASs, GetMASJobRecords, ScheduleMASs, HideAnnotationSidePanel } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const fetch = useFetch();

    /* Base variables */
    const annotationTarget = useAppSelector(getAnnotationTarget);
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
            handle: superClass?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        triggers: [superClass, annotationWizardToggle],
        Method: GetAnnotations,
        Handler: (annotations: Annotation[]) => {
            setAnnotations(annotations)
        }
    });

    /**
     * Function for refreshing the annotations in the side panel by fetching fresh data from the API
     */
    const RefreshAnnotations = async () => {
        setLoading(true);

        const annotations = await GetAnnotations({
            handle: superClass?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
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
        <div className={`${styles.annotationSidePanel} h-100 w-100 position-relative d-flex flex-column bgc-default px-4 py-4`}>
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
                    {(annotationWizardToggle && superClass) ?
                        <AnnotationWizard schema={schema}
                            superClass={superClass}
                            StopAnnotationWizard={() => {
                                setAnnotationWizardToggle(false);
                                dispatch(setAnnotationTarget(annotationTarget ? {
                                    ...annotationTarget,
                                    annotation: undefined
                                } : undefined));
                                setLoading(false);
                            }}
                            SetLoading={(loading: boolean) => setLoading(loading)}
                            SetFilterSortValues={setFilterSortValues}
                        />
                        : <>
                            {(masMenuToggle && superClass) ? <MASMenu superClass={superClass}
                                CloseMASMenu={() => setMasMenuToggle(false)}
                                SetLoading={setLoading}
                                GetMASs={GetMASs}
                                GetMASJobRecords={GetMASJobRecords}
                                ScheduleMASs={ScheduleMASs}
                            />
                                : <AnnotationsOverview annotations={annotations}
                                    filterSortValues={filterSortValues}
                                    schemaTitle={schema.title}
                                    SetFilterSortValues={setFilterSortValues}
                                    StartAnnotationWizard={() => setAnnotationWizardToggle(true)}
                                    RefreshAnnotations={RefreshAnnotations}
                                    OpenMASMenu={() => setMasMenuToggle(true)}
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