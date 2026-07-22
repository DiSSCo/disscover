import { Badge, Card } from "@radix-ui/themes";
import { RetrieveEnvVariable } from "app/Utilities";
import { GetSpecimenNameHTMLLabel } from "app/utilities/NomenclaturalUtilities";
import { Link } from "react-router-dom";

/* Import styling */
import './VirtualCollectionCard.scss';

interface Props {
    collection: any,
    type: "details" | "overview"
}

export const VirtualCollectionCard = ({ collection, type: viewType }: Props) => {
    return (
        <>
            { viewType === "details" && 
                <Card variant="surface" className="gallery-card" asChild>
                    <Link to={`/ds/${collection.id.replace(RetrieveEnvVariable('DOI_URL'), '')}`}>
                        { !collection.attributes['ods:isKnownToContainMedia'] &&
                        <div className="vc-card-image-container">
                            <span>No image</span>
                        </div>
                        }
                        <div className="vc-card-content-container">
                            { collection.attributes?.['ods:hasIdentifications']?.[0]?.['dwc:typeStatus'] && 
                            <Badge color="sky" variant="solid">{collection.attributes['ods:hasIdentifications'][0]['dwc:typeStatus']}</Badge>
                            }
                            <p dangerouslySetInnerHTML={{__html: GetSpecimenNameHTMLLabel(collection.attributes)}}></p>
                            <span>{collection.attributes['ods:hasEvents'][0]['ods:hasLocation']['dwc:country']}</span>
                            <span> • </span>
                            <span id="updated-date">{collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] ? collection.attributes['ods:hasEvents'][0]['dwc:eventDate'] : 'Unknown'}</span>
                            <p>{collection.attributes['dcterms:rightsHolder']}</p>
                        </div>
                    </Link>
                </Card>
            }
        </>
    )
}