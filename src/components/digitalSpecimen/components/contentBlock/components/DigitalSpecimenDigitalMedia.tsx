/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';

/* Import Components */
import { Audio, File, Image, Video } from 'components/elements/media/MediaComponents';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimenDigitalMedia: DigitalMedia[]
};


/**
 * Component that renders the digital media content block on the digital specimen page
 * @param digitalSpecimenDigitalMedia An array containing the digital media items belonging to the digital specimen
 * @returns JSX Component
 */
const DigitalSpecimenDigitalMedia = (props: Props) => {
    const { digitalSpecimenDigitalMedia } = props;

    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const digitalMediaComponentsDict: {
        [mediaType: string]: JSX.Element[]
    } = {};

    /* Determine digital media components based upon their type */
    digitalSpecimenDigitalMedia.forEach(digitalMedia => {
        switch (digitalMedia['dcterms:type']) {
            case 'Image':
            case 'StillImage':
                (digitalMediaComponentsDict.images || (digitalMediaComponentsDict.images = [])).push(
                    <Button type="button"
                        variant="blank"
                        className="h-100 w-100 px-0 py-0 object-fit-contain"
                        OnClick={() => navigate(`/dm/${digitalMedia['@id'].replace(import.meta.env.VITE_DOI_URL, '')}`)}
                    >
                        <Image accessURI={digitalMedia['ac:accessURI']}
                            sizeOrientation="height"
                        />
                    </Button>
                );

                break;
            case 'Sound':
                (digitalMediaComponentsDict.audio || (digitalMediaComponentsDict.images = [])).push(
                    <Audio accessURI={digitalMedia['ac:accessURI']} />
                );

                break;
            case 'MovingImage':
                (digitalMediaComponentsDict.video || (digitalMediaComponentsDict.images = [])).push(
                    <Video accessURI={digitalMedia['ac:accessURI']} />
                );

                break;
            default:
                (digitalMediaComponentsDict.otherMedia || (digitalMediaComponentsDict.images = [])).push(
                    <File accessURI={digitalMedia['ac:accessURI']} />
                );
        };
    });

    return (
        <div className="h-100">
            {/* Render dedicated media components per type */}
            {Object.entries(digitalMediaComponentsDict).map(([mediaType, digitalMediaComponents]) => (
                <Row key={mediaType}
                    className="h-25"
                >
                    <Col className="h-100">
                        <Card className="h-100 d-flex flex-column py-2">
                            <Row>
                                <Col className="mx-3">
                                    <p className="fs-4 tc-primary fw-lightBold">
                                        {MakeReadableString(mediaType)}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="flex-grow-1 overflow-hidden mt-1">
                                <Col className="h-100">
                                    <div className="h-100 horizontalScroll">
                                        {digitalMediaComponents.map((digitalMediaComponent, index) => {
                                            const key = `digitalMediaComponent-${index}`;

                                            return (
                                                <div key={key}
                                                    className="w-25 h-100 d-inline-block bgc-grey-light mx-3"
                                                >
                                                    {digitalMediaComponent}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default DigitalSpecimenDigitalMedia;