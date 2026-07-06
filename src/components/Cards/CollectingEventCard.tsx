/* Import components */
import { Card } from '@radix-ui/themes';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';

/* Import styles */
import './Cards.scss';

type FragmentType = 'verbatim' | 'copy' | 'default' | 'url';

interface Props {
    fragment: {
        collector: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        date: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        verbatimDate: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
    }
}

export const CollectingEventCard = ({ fragment }: Props ) => {
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