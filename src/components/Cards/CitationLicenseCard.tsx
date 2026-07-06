/* Import components */
import { Button, Card } from '@radix-ui/themes';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';
import { CopyIcon } from '@radix-ui/react-icons';

/* Import styles */
import './Cards.scss';

type FragmentType = 'verbatim' | 'copy' | 'default' | 'url';

interface Props {
    fragment: {
        digitalSpecimenId: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        license: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        organisationId: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        organisationName: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
        specimenName: { label: string, value: string, isHtml: false, type: FragmentType, hidden: boolean },
    }
}

export const CitationLicenseCard = ({ fragment }: Props ) => {
    const craftCitation = (fragment: any) => {
        return (
        <>
            <a href={fragment['organisationId'].value}
                target="_blank"
                rel="noreferer"
            >
                {fragment['organisationName'].value ?? fragment['organisationId'].value}
            </a>
            {` (${new Date().getFullYear()}). `}
            { fragment['specimenName'].value + '. '}
            <a href="https://ror.org/02wddde16"
                target="_blank"
                rel="noreferer"
            >
                Distributed System of Scientific Collections
            </a>
            {`. [Dataset]. `}
            <a href={fragment['digitalSpecimenId'].value}
                target="_blank"
                rel="noreferer"
            >
                {fragment['digitalSpecimenId'].value}
            </a>
        </>
        )
    
    }
    return (
        <Card className="digital-specimen-card">
            <div className="digital-specimen-card-header">
                <h2>Citation and License</h2>
                <Button variant="ghost">
                    Copy citation
                    <CopyIcon />
                </Button>
            </div>
            <div className="digital-specimen-card-citation">
                <p>{craftCitation(fragment)}</p>
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['license']}></LabelValuePair>
            </div>
        </Card>
    )
}