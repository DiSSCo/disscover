/* Import Dependencies */
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFetch } from 'app/Hooks';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalMedia } from 'app/types/DigitalMedia';
import { Annotation } from 'app/types/Annotation';
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './annotationSidePanel.module.scss';

/* Import Components */
import { AnnotationsOverview, AnnotationPolicyText, AnnotationWizard, TopBar } from './AnnotationSidePanelComponents';
import { LoadingScreen } from '../customUI/CustomUI';


/* Props Type */
type Props = {
    superClass: DigitalSpecimen | DigitalMedia | undefined,
    schema: Dict,
    GetAnnotations: Function,
    HideAnnotationSidePanel: Function
};


/**
 * Component that renders the annotation side panel
 * @param annotationMode Boolean indicating if the annotation mode is on or not
 * @param superClass The super class reigning the annotation side panel, either Digital Specimen or Digital Media
 * @param GetAnnotations Function that fetches the annotations of the super class
 * @param HideAnnotationSidePanel Function to hide the annotation side panel
 * @returns JSX Component
 */
const AnnotationSidePanel = (props: Props) => {
    const { superClass, schema, GetAnnotations, HideAnnotationSidePanel } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [annotationWizardToggle, setAnnotationWizardToggle] = useState<boolean>(false);
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
                                setLoading(false);
                            }}
                            SetLoading={(loading: boolean) => setLoading(loading)}
                            SetFilterSortValues={setFilterSortValues}
                        />
                        : <AnnotationsOverview annotations={annotations}
                            filterSortValues={filterSortValues}
                            SetFilterSortValues={setFilterSortValues}
                            StartAnnotationWizard={() => setAnnotationWizardToggle(true)}
                        />
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