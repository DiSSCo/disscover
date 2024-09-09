/* Import Dependencies */
import { useState } from 'react';

/* Import Hooks */
import { useFetch } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import GetDigitalSpecimenOriginalData from 'api/digitalSpecimen/GetDigitalSpecimenOriginalData';

/* Import Components */
import ClassProperties from './classProperties/ClassProperties';
import { LoadingScreen } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimenId: string
};


/**
 * Component that renders the original data tab on the digital specimen page
 * @returns JSX Component
 */
const OriginalData = (props: Props) => {
    const { digitalSpecimenId } = props;

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */
    const [originalData, setOriginalData] = useState<Dict | undefined>();

    /* OnLoad: fetch original data */
    fetch.Fetch({
        params: {
            digitalSpecimenId: digitalSpecimenId.replace(import.meta.env.VITE_DOI_URL, '')
        },
        Method: GetDigitalSpecimenOriginalData,
        Handler: (originalData: Dict) => {
            setOriginalData(originalData)
        }
    });

    return (
        <div className="h-100 position-relative">
            {originalData ?
                <ClassProperties title="originalData"
                    properties={originalData}
                />
                : <LoadingScreen visible={true}
                    className="bgc-white"
                    displaySpinner={fetch.loading}
                    text={fetch.loading ? 'Loading original data' : 'Something went wrong, please try again'}
                />
            }
        </div>
    );
};

export default OriginalData;