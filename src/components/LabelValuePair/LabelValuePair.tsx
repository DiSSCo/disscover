/* Import styles */
import './LabelValuePair.scss';

/* Import components */
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { Badge } from '@radix-ui/themes';

/* Import hooks */
import { useClipboard } from 'hooks/useClipboard';

/* Import utils */
import { sanitizeHtmlWrapper } from 'utils/Utils';

type ItemProps =
    // URLs must be strings, and they shouldn't be HTML
    | { 
        type: 'url'; 
        value: string; 
        isHtml: false; 
        label: string; 
        hidden: boolean; 
      }
    // If it's HTML, the value must be a string (regardless of type)
    | { 
        type: 'verbatim' | 'copy' | 'default'; 
        value: string; 
        isHtml: true; 
        label: string; 
        hidden: boolean; 
      }
    // Copy, verbatim, and default can accept strings OR numbers if it's NOT HTML
    | { 
        type: 'verbatim' | 'copy' | 'default'; 
        value: string | number; 
        isHtml: false; 
        label: string; 
        hidden: boolean; 
      };

type Props = {
    item: ItemProps;
    extraItem?: {
        label: string;
        value: string;
        isHtml: boolean;
        type: string;
        hidden: boolean;
    };
};

export const LabelValuePair = ({ item, extraItem }: Props) => {
    const { copy } = useClipboard();

    if (item.value === undefined || item.value === null || item.value === '' || item.hidden) {
        return null;
    }

    const renderValueContent = () => {
        switch (item.type) {
            case 'url':
                return item.label === 'Taxonomic Status' ? (
                    <div className="url-label-value">
                        <a href={item.value} target="_blank" rel="noopener noreferrer">
                            Catalogue of Life
                            <ExternalLinkIcon />
                        </a>
                        {extraItem?.value && <Badge color="green">{extraItem.value}</Badge>}
                    </div>
                ) : (
					<div className="url-label-value">
                        <a href={item.value} target="_blank" rel="noopener noreferrer">
                            { item.value }
                            <ExternalLinkIcon />
                        </a>
                    </div>
				);

            case 'copy':
                return (
                    <button className="btn-as-link" onClick={() => copy(item.value.toString())}>
                        {item.value}
                        <CopyIcon />
                    </button>
                );

            case 'verbatim':
                return (
                    <span className="verbatim">
                        {item.value}
                        <Badge variant="soft" color="gray">Original</Badge>
                    </span>
                );

            default:
                return item.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: sanitizeHtmlWrapper(item.value) }} />
                ) : (
                    <span>{item.value}</span>
                );
        }
    };
  
    return (
        <div className="property-row-fragment">
            <span className={`property-label ${item.type === 'verbatim' ? 'verbatim' : ''}`}>
                {item.label}
            </span>
            <span className="property-value">
                {renderValueContent()}
            </span>
        </div>
    );
};