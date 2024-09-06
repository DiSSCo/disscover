/* Import Dependencies */
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
import { AnnotationsOverview, AnnotationWizard, TopBar } from './AnnotationSidePanelComponents';


/* Props Type */
type Props = {
    annotationMode: boolean,
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
    const { annotationMode, superClass, schema, GetAnnotations, HideAnnotationSidePanel } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [annotationWizardToggle, setAnnotationWizardToggle] = useState<boolean>(false);

    /* OnLoad: fetch annotations of super class with provided method */
    fetch.Fetch({
        params: {
            handle: superClass?.['ods:ID'].replace(import.meta.env.VITE_DOI_URL, '')
        },
        triggers: [superClass],
        Method: GetAnnotations,
        Handler: (annotations: Annotation[]) => {
            setAnnotations(annotations)
        }
    });

    return (
        <div className={`${styles.annotationSidePanel} h-100 w-100 d-flex flex-column bgc-default px-4 py-4`}>
            {/* Top bar */}
            <Row>
                <Col>
                    <TopBar HideAnnotationSidePanel={HideAnnotationSidePanel}

                    />
                </Col>
            </Row>
            {/* Annotations overview or wizard depending on state */}
            <Row className="flex-grow-1 mt-4">
                <Col>
                    {(annotationWizardToggle && superClass) ?
                        <AnnotationWizard superClass={superClass}
                            schema={schema}
                        />
                        : <AnnotationsOverview annotations={annotations}
                            StartAnnotationWizard={() => setAnnotationWizardToggle(true)}
                        />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationSidePanel;