/* Import styles */
import './Cards.scss';

/* Import components */
import { Button, Card } from '@radix-ui/themes';
import { OpenStreetMap } from 'components/elements/customUI/CustomUI';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Props {
    fragment: any;
}

export const GeoreferenceCard = ({ fragment }: Props ) => {
    return (
        <Card className="digital-specimen-card">
            <div className="digital-specimen-card-header">
                <h2>Location</h2>
                <Button variant="ghost">
                    Annotate
                    <Pencil2Icon />
                </Button>
            </div>
            <div className="ds-card-georeference">
                <OpenStreetMap latitude={fragment?.['decimalLatitude'].value} longitude={fragment?.['decimalLongitude'].value} />
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['country']}></LabelValuePair>
                <LabelValuePair item={fragment['locality']}></LabelValuePair>
                <LabelValuePair item={fragment['verbatimLocality']}></LabelValuePair>
                <LabelValuePair item={fragment['decimalLatitude']}></LabelValuePair>
                <LabelValuePair item={fragment['verbatimLatitude']}></LabelValuePair>
                <LabelValuePair item={fragment['decimalLongitude']}></LabelValuePair>
                <LabelValuePair item={fragment['verbatimLongitude']}></LabelValuePair>
                <LabelValuePair item={fragment['geodeticDatum']}></LabelValuePair>
            </div>
        </Card>
    );
};