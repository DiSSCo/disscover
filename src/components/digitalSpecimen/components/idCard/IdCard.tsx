/* Import Dependencies */
import classNames from 'classnames';
import jp from 'jsonpath';
import { useState, createElement, DetailedReactHTMLElement, HTMLAttributes } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { GetSpecimenNameHTMLLabel } from 'app/utilities/NomenclaturalUtilities';

/* Import Config */
import DigitalSpecimenIdCardConfig from 'app/config/idCard/DigitalSpecimenIdCardConfig';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    digitalSpecimenDigitalMedia: DigitalMedia[] | undefined,
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders the ID card on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param digitalSpecimenDigitalMedia The digital media belonging to the digital specimen
 * @param annotationMode Boolean indicating if the annotation mode is enabled
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const IdCard = (props: Props) => {
    const { digitalSpecimen, digitalSpecimenDigitalMedia, annotationMode, SetAnnotationTarget } = props;

    /* Hooks */
    const trigger = useTrigger();

    /* Base variables */
    const [bannerImage, setBannerImage] = useState<DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement> | undefined>();

    /* OnLoad, check image height and width, if height is bigger than width, rotate it */
    trigger.SetTrigger(() => {
        let digitalSpecimenImage = new Image();

        digitalSpecimenImage.src = digitalSpecimenDigitalMedia?.find(digitalMedia =>
            digitalMedia['dcterms:type'] === 'Image' ||
            digitalMedia['dcterms:type'] === 'StillImage'
        )?.['ac:accessURI'] ?? '';

        digitalSpecimenImage.onload = () => {
            const height = digitalSpecimenImage.height;
            const width = digitalSpecimenImage.width;
            let rotate: boolean = false;

            if (height > width) {
                rotate = true;
            };

            setBannerImage(createElement('img', {
                src: digitalSpecimenImage.src,
                className: `${rotate ? 'rotate-90' : ''} h-100`
            }));
        };
    }, []);

    /* Class Names */
    const idCardItemClass = classNames({
        'hover-grey mc-pointer': annotationMode
    });

    const idCardItemButtonClass = classNames({
        'mc-default': !annotationMode
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* First digital media image of digital specimen, if present */}
            {digitalSpecimen['ods:isKnownToContainMedia'] &&
                <Row className="h-25 mb-3">
                    <Col className="h-100">
                        <div className="h-100 d-flex flex-column justify-content-center align-items-center bgc-grey-light overflow-hidden br-corner">
                            {bannerImage}
                        </div>
                    </Col>
                </Row>
            }
            {/* ID card items*/}
            <Row className="flex-grow-1 overflow-hidden">
                <Col className="h-100">
                    <Card className="h-100 bgc-white px-3 py-3">
                        <div className="h-100 d-flex flex-column justify-content-between">
                            {/* Nomenclatural name (HTML label) */}
                            <Row>
                                <Col className={`${idCardItemClass} fs-4 tr-fast`}>
                                    <button type="button"
                                        className={`${idCardItemButtonClass} button-no-style px-0 py-0 overflow-hidden`}
                                        onClick={() => annotationMode && SetAnnotationTarget('term', "$['ods:specimenName']")}
                                    >
                                        <p className="fw-lightBold">Specimen Name</p>
                                        <p dangerouslySetInnerHTML={{ __html: GetSpecimenNameHTMLLabel(digitalSpecimen) }} />
                                    </button>
                                </Col>
                            </Row>
                            {/* ID card properties */}
                            {DigitalSpecimenIdCardConfig({ digitalSpecimen }).map(idCardField => {
                                return (
                                    <Row key={idCardField.label}>
                                        {/* ID card item */}
                                        <Col className={`${idCardItemClass} fs-4 tr-fast overflow-hidden`}>
                                            <button type="button"
                                                className={`${idCardItemButtonClass} button-no-style px-0 py-0 overflow-hidden`}
                                                onClick={() => annotationMode && SetAnnotationTarget('term', idCardField.jsonPath)}
                                            >
                                                {/* Item label */}
                                                <p className="fw-lightBold">{idCardField.label}</p>
                                                <p>{jp.query(digitalSpecimen, idCardField.jsonPath)}</p>
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default IdCard;