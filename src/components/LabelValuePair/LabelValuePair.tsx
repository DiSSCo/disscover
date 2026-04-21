/* Import styles */
import { Badge } from '@radix-ui/themes';
import './LabelValuePair.scss';

/* Import components */
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

/* Import hooks */
import { useClipboard } from 'hooks/useClipboard';

/* Import utils */
import { RetrieveEnvVariable } from 'app/Utilities';

type Props = {
    item: {
        label: string;
        value: string;
        isHtml: boolean;
        type: string;
    }
}

/**
 * Renders a single row of data.
 * If the value is missing/null, it returns null to hide the row.
 */
export const LabelValuePair = ({ item }: Props) => {
    if (!item.value) return null;

	/* Base variables */
	const { copy } = useClipboard();

	/* Return correct piece of HTML based on the type */
	const setCorrectItemType = () => {
		switch (item.type) {
			case 'url':
				return (
					<a href={item.value} target="_blank" rel="noopener noreferrer">
						Catalogue of Life
						<ExternalLinkIcon></ExternalLinkIcon>
					</a>
				);
			case 'verbatim':
				return (
					<span className="verbatim">
						{item.value}
						<Badge variant="soft" color="gray">Original</Badge>
					</span>
				)
			case 'copy':
				return (
					<button className="btn-as-link" onClick={() => copy(item?.value)}>
						{item?.value.replace(RetrieveEnvVariable('DOI_URL'), '')}
						<CopyIcon />
					</button>
				)
			default:
				return (
					item?.isHtml ? (
						<span dangerouslySetInnerHTML={{ __html: item.value }} />
					) : (
						<span>{item.value}</span>
					)
				)
		}

	}
  
    return (
		<div className="property-row-fragment">
			{item.type === 'verbatim' ?
				<span className="property-label verbatim">{item.label}</span>
				: <span className="property-label">{item.label}</span>
			}
		
			<span className="property-value">
				{setCorrectItemType()}
			</span>
		</div>
    );
};