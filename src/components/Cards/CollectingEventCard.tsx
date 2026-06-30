import { Card } from '@radix-ui/themes';
import './Cards.scss';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';

interface Props {
    fragment: any;
}

export const CollectingEventCard = ({ fragment }: Props ) => {
    console.log(fragment);
    return (
        <Card className="digital-specimen-card">
            <div className="digital-specimen-card-header">
                <h2>Collecting event</h2>
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['collector']}></LabelValuePair>
                <LabelValuePair item={fragment['date']}></LabelValuePair>
                <LabelValuePair item={fragment['verbatimDate']}></LabelValuePair>
            </div>
        </Card>
    )
}