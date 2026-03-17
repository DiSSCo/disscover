/* Import styles */
import './LabelValuePair.scss';

type Props = {
    item: {
        label: string;
        value: string;
        isHtml: boolean;
    }
}

/**
 * Renders a single row of data.
 * If the value is missing/null, it returns null to hide the row.
 */
export const LabelValuePair = ({ item }: Props) => {
    if (!item.value) return null;
  
    return (
      <div className="property-row-fragment">
        <span className="property-label">{item.label}</span>
        <span className="property-value">
          {item.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: item.value }} />
          ) : (
            item.value
          )}
        </span>
      </div>
    );
  };