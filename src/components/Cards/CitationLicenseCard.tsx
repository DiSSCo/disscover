import { Button, Card } from '@radix-ui/themes';
import './Cards.scss';
import { LabelValuePair } from 'components/LabelValuePair/LabelValuePair';
import { CopyIcon } from '@radix-ui/react-icons';

interface Props {
    fragment: any;
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
            <div className="ds-card-citation">
                <p>{craftCitation(fragment)}</p>
            </div>
            <div className="digital-specimen-card-content">
                <LabelValuePair item={fragment['license']}></LabelValuePair>
            </div>
        </Card>
    )
}