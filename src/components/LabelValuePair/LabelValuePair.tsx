/* Import styles */
import './LabelValuePair.scss';

/* Import components */
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { Badge } from '@radix-ui/themes';

/* Import hooks */
import { useClipboard } from 'hooks/useClipboard';

/* Import utils */
import { sanitizeHtmlWrapper } from 'utils/Utils';

type Props = {
    item: {
        label: string;
        value: string;
        isHtml: boolean;
        type: string;
		hidden: boolean;
    },
	extraItem?: {
		label: string;
        value: string;
        isHtml: boolean;
        type: string;
		hidden: boolean;
	}
}

/**
 * Renders a single row of data.
 * If the value is missing/null, it returns null to hide the row.
 */
export const LabelValuePair = ({ item, extraItem }: Props) => {
	/* Base variables */
	const { copy } = useClipboard();

	if (!item.value || item.hidden) return null;

	/* Return correct piece of HTML based on the type */
	const setCorrectItemType = () => {
		switch (item.type) {
			case 'url':
				return (
					<div className="taxonomic-status">
						<a href={item.value} target="_blank" rel="noopener noreferrer">
							Catalogue of Life
							<ExternalLinkIcon></ExternalLinkIcon>
						</a>
						{extraItem?.value && <Badge color="green">{extraItem.value}</Badge>}
					</div>

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
						{item?.value}
						<CopyIcon />
					</button>
				)
			default:
				return (
					item?.isHtml ? (
						<span dangerouslySetInnerHTML={{ __html: sanitizeHtmlWrapper(item.value) }} />
					) : (
						<span>{item.value}</span>
					)
				)
		}

	}
  
    return (
		<div className="property-row-fragment">
			<span className={"property-label " + (item.type === 'verbatim' ? "verbatim" : "")}>{item.label}</span>
		
			<span className="property-value">
				{setCorrectItemType()}
			</span>
		</div>
    );
};