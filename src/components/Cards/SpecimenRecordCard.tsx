import { Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";

/* Import styles */
import './Cards.scss';

type FragmentType = 'verbatim' | 'copy' | 'default' | 'url';

interface Props {
    fragment: {
        doi: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        catalogNumber: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        specimenProvider: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        sourceSystem: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        basisOfRecord: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        discipline: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
    }
}

export const SpecimenRecordCard = ({ fragment }: Props ) => {
    return (
        <Card className="digital-specimen-card">
            <div className="digital-specimen-card-header">
                <h2>Specimen Record</h2>
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['doi']}></LabelValuePair>
                <LabelValuePair item={fragment['catalogNumber']}></LabelValuePair>
                <LabelValuePair item={fragment['specimenProvider']}></LabelValuePair>
                <LabelValuePair item={fragment['sourceSystem']}></LabelValuePair>
                <LabelValuePair item={fragment['basisOfRecord']}></LabelValuePair>
                <LabelValuePair item={fragment['discipline']}></LabelValuePair>
            </div>
        </Card>
    )
}