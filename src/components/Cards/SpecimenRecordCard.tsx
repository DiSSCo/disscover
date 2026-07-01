import { Card } from "@radix-ui/themes";
import { LabelValuePair } from "components/LabelValuePair/LabelValuePair";

/* Import styles */
import './Cards.scss';

interface Props {
    fragment: any
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
            <div className="card-divider"></div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['virtualCollection']}></LabelValuePair>
            </div>
        </Card>
    )
}