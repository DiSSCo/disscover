/* Import Dependencies */
import { useState } from "react";

/* Import Hooks */
import { useNavigate } from "react-router-dom";
import { useFetch } from "app/Hooks";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";

/* Import Styles */
import styles from '../contentBlock.module.scss'

/* Import API */
import GetDigitalSpecimenDigitalMedia from "api/digitalSpecimen/GetDigitalSpecimenDigitalMedia";

/* Import Components */
import { DigitalMediaItem } from "components/elements/Elements";
import { Button } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia
};


/**
 * Component that renders the digital media list on the digital media page
 * @returns JSX Component
 */
const DigitalMediaList = (props: Props) => {
    const { digitalMedia } = props;

    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();

    /* Base variables */
    const [digitalSpecimenDigitalMedia, setDigitalSpecimenDigitalMedia] = useState<DigitalMedia[]>([]);

    /* OnLoad, fetch associated digital media based upon digital specimen identifier */
    fetch.Fetch({
        params: {
            handle: digitalMedia["ods:hasEntityRelationship"]?.find(
                entityRelationship => entityRelationship['dwc:relationshipOfResource'] === 'hasDigitalSpecimen'
            )?.["dwc:relatedResourceID"]
        },
        Method: GetDigitalSpecimenDigitalMedia,
        Handler: (digitalSpecimenDigitalMedia: DigitalMedia[]) => setDigitalSpecimenDigitalMedia(digitalSpecimenDigitalMedia)
    });

    return (
        <div className="h-100">
            <div className="h-100 horizontalScroll">
                {digitalSpecimenDigitalMedia.map(digitalSpecimenDigitalMedia => (
                    <div className={`${styles.digitalMediaListItem} h-100 overflow-hidden position-relative d-inline-block px-2 bgc-grey-light`}>
                        <Button type="button"
                            variant="blank"
                            className="h-100 w-100 px-0 py-0"
                            OnClick={() => navigate(`/dm/${digitalSpecimenDigitalMedia["ods:ID"].replace(import.meta.env.VITE_DOI_URL, '')}`)}
                        >
                            <DigitalMediaItem digitalMedia={digitalSpecimenDigitalMedia} />
                        </Button>

                        {/* Show overlay if this digital media item is selected */}
                        {digitalSpecimenDigitalMedia["ods:ID"] === digitalMedia["ods:ID"] &&
                            <div className="position-absolute w-100 h-100 start-0 top-0 bgc-dark-opacity d-flex justify-content-center align-items-center">
                                <p className="tc-white fw-bold">Selected</p>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalMediaList;