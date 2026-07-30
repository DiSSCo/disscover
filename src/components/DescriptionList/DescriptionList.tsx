/* Import components */
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";

/* Import types */
import { UIProperty } from "types/dataMapperTypes";
import { SpecimenField } from "types/digitalSpecimenTypes";

interface Props {
    fragment: SpecimenField[];
}

export const DescriptionList = ({ fragment }: Props) => {
    return (
        <dl className="ds-card-body">
            {fragment
                .filter((item: UIProperty) => !item.hidden)
                .map((item: UIProperty, index: number) => (
                    <LabelValuePair 
                        key={item.label || index} 
                        item={item as { label: string; value: string; isHtml: boolean; type: string; hidden: boolean; }} 
                    />
                ))
            }
        </dl>
    )
    
}