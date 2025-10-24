/* Import Dependencies */
import { cloneDeep, isEmpty } from "lodash";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { Dict } from "app/Types";

/* Import Components */
import { ClassProperties } from "components/elements/Elements";


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
};


/**
 * Component that renders the identifications content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @returns JSX Component
 */
const Identifications = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Base variables */
    const identifications: {
        mainProperties: Dict,
        [taxonIdentifications: string]: Dict
    }[] = [];
    const jsonPaths: {
        [propertySection: string]: string
    } = {
        mainProperties: "$['ods:hasIdentifications'][index]",
        taxonIdentifications: "$['ods:hasIdentifications'][index]['ods:hasTaxonIdentifications'][subIndex]"
    };

    /* Craft identifications dictionary to iterate over */
    digitalSpecimen["ods:hasIdentifications"]?.forEach((identification, index) => {
        const copyIdentification = cloneDeep(identification);

        /* Push new craft occurrence to array */
        identifications.push({
            mainProperties: {},
            taxonIdentifications: []
        });

        /* Check for Taxon Identifications */
        if (!isEmpty(identification["ods:hasTaxonIdentifications"])) {
            identification["ods:hasTaxonIdentifications"]?.forEach((taxonIdentification, taxonIdentificationIndex) => {
                /* Add Taxon Identification to craft identification */
                identifications[index].taxonIdentifications[taxonIdentificationIndex] = taxonIdentification;
            });
        }

        /* Remove extensions from core identification object */
        ['taxonIdentifications'].forEach((key) => delete copyIdentification[key as keyof typeof copyIdentification]);

        identifications[index].mainProperties = copyIdentification;
    });

    return (
        <div>
            {identifications.map((identification, index) => {
                const key: string = identification.mainProperties['dwc:identificationID'] ?? `identification_${index}`;

                return (
                    <ClassProperties key={key}
                        index={index}
                        title="identification"
                        properties={identification}
                        jsonPaths={jsonPaths}
                    />
                );
            })}
        </div>
    );
};

export default Identifications;