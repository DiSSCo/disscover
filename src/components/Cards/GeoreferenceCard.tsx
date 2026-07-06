/* Import components */
import { Button, Card } from '@radix-ui/themes';
import { OpenStreetMap } from 'components/elements/customUI/CustomUI';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';
import { Pencil2Icon } from '@radix-ui/react-icons';

/* Import styles */
import './Cards.scss';

type FragmentType = 'verbatim' | 'copy' | 'default';

interface Props {
    fragment: {
        country: { label: string, value: string, isHtml: boolean, type: FragmentType, hidden: boolean },
        decimalLatitude: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
        decimalLongitude: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
        geodeticDatum: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
        locality: { label: string, value: string, isHtml: boolean, type: FragmentType, hidden: boolean },
        verbatimLatitude: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
        verbatimLocality: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
        verbatimLongitude: { label: string, value: number, isHtml: false, type: FragmentType, hidden: boolean },
    };
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
            <div className="digital-specimen-card-georeference">
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