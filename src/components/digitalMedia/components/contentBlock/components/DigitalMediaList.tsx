/* Import Utilities */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import Hooks */
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "app/Hooks";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";

/* Import Styles */
import styles from '../contentBlock.module.scss'

/* Import Components */
import { DigitalMediaItem } from "components/elements/Elements";
import { Button } from "components/elements/customUI/CustomUI";
import { getDigitalSpecimenDigitalMedia } from "redux-store/DigitalSpecimenSlice";


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

    /* Base variables */
    const digitalSpecimenDigitalMedia = useAppSelector(getDigitalSpecimenDigitalMedia);

    return (
        <div className="h-100">
            <div className="h-100 horizontalScroll">
                {digitalSpecimenDigitalMedia.map(digitalSpecimenDigitalMedia => (
                    <div key={digitalSpecimenDigitalMedia["@id"]}
                        className={`${styles.digitalMediaListItem} h-100 py-3 overflow-hidden position-relative d-inline-block px-2 bgc-grey-light`}
                    >
                        <Button type="button"
                            variant="blank"
                            className="h-100 w-100 px-0 py-0"
                            OnClick={() => navigate(`/dm/${digitalSpecimenDigitalMedia["@id"].replace(RetrieveEnvVariable('DOI_URL'), '')}`)}
                        >
                            <DigitalMediaItem digitalMedia={digitalSpecimenDigitalMedia} />
                        </Button>

                        {/* Show overlay if this digital media item is selected */}
                        {digitalSpecimenDigitalMedia["@id"] === digitalMedia["@id"] &&
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