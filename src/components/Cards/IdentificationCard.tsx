/* Import components */
import { Button, Card } from '@radix-ui/themes';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';
import { Pencil2Icon } from '@radix-ui/react-icons';

/* Import styles */
import './Cards.scss';

type FragmentType = 'verbatim' | 'copy' | 'default' | 'url';
type isHtmlFragmentType = 'verbatim' | 'copy' | 'default';

interface Props {
    fragment: {
        scientificName: { label: string, value: string, isHtml: true, type: isHtmlFragmentType, hidden: boolean },
        verbatimName: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        rank: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        catalogueOfLife: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        taxonomicStatus: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        kingdom: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        phylum: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        class: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        order: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        family: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        genus: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        species: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        specificEpithet: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        infragenericEpithet: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        infraspecificEpithet: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        nomenClaturalCode: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        scientificNameAuthorship: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        sex: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        lifeStage: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
    }
}

export const IdentificationCard = ({ fragment }: Props ) => {
    return (
        <Card className="digital-specimen-card">
            <div className="digital-specimen-card-header">
                <h2>Identification</h2>
                <Button variant="ghost">
                    Annotate
                    <Pencil2Icon />
                </Button>
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['scientificName']} ></LabelValuePair>
                <LabelValuePair item={fragment['verbatimName']} ></LabelValuePair>
                <LabelValuePair item={fragment['rank']} ></LabelValuePair>
                <LabelValuePair item={fragment['catalogueOfLife']} extraItem={fragment['taxonomicStatus']}></LabelValuePair>
            </div>
            <div className="card-divider"></div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['kingdom']} ></LabelValuePair>
                <LabelValuePair item={fragment['phylum']} ></LabelValuePair>
                <LabelValuePair item={fragment['class']} ></LabelValuePair>
                <LabelValuePair item={fragment['order']} ></LabelValuePair>
                <LabelValuePair item={fragment['family']} ></LabelValuePair>
                <LabelValuePair item={fragment['genus']} ></LabelValuePair>
                <LabelValuePair item={fragment['species']} ></LabelValuePair>
            </div>
            <div className="card-divider"></div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['specificEpithet']} ></LabelValuePair>
                <LabelValuePair item={fragment['infragenericEpithet']} ></LabelValuePair>
                <LabelValuePair item={fragment['infraspecificEpithet']} ></LabelValuePair>
                <LabelValuePair item={fragment['nomenClaturalCode']} ></LabelValuePair>
                <LabelValuePair item={fragment['scientificNameAuthorship']} ></LabelValuePair>
            </div>
            { (fragment['sex'].value && fragment['lifeStage'].value) && <div className="card-divider"></div>}
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['sex']} ></LabelValuePair>
                <LabelValuePair item={fragment['lifeStage']} ></LabelValuePair>
            </div>
        </Card>
    )
}