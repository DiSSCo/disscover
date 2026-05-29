/* Import dependencies */
import { useLayoutEffect, useRef, useState } from "react";

interface ConfirmViewProps {
    data: {
        title: string,
        description: string,
        type: string,
        specimenRawList: string,
        specimens: string[],
    };
    onEditAbout: () => void;
    onEditSpecimens: () => void;
}

/**
 * The Confirm View
 * @param onEditAbout Function that triggers an action when clicked
 * @param onEditSpecimens Function that triggers an action when clicked
 * @returns A JSX element that contains the Confirm View for the Multi Step Form
 */
const ConfirmView = ({ data, onEditAbout, onEditSpecimens }: ConfirmViewProps) => {
    /* UI Toggle States */
    const [showDescription, setShowDescription] = useState(false);
    const [showAllSpecimen, setShowAllSpecimen] = useState(false);
    const [isDescriptionClamped, setIsDescriptionClamped] = useState(false);
    
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    /* Description line-clamp check */
    useLayoutEffect(() => {
        const element = descriptionRef.current;
        if (element) {
            const isTruncated = element.scrollHeight > element.clientHeight;
            setIsDescriptionClamped(isTruncated);
        }
    }, [data.description]);

    /* Specimen calculation logic */
    const MAX_INITIAL_ITEMS = 3;
    const hasTooManySpecimens = data.specimens.length > MAX_INITIAL_ITEMS;
    const shownSpecimen = hasTooManySpecimens && !showAllSpecimen 
        ? data.specimens.slice(0, MAX_INITIAL_ITEMS) 
        : data.specimens;
    const specimenCount = data.specimens.length;

    return (
        <div id="confirm-view" className="form-view-container">
            <h2>Review and confirm</h2>
            <p>Please the review collection details and create your collection when ready.</p>

            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>About</h3>
                    <button type="button" onClick={onEditAbout} className="helper-button">Edit</button>
                </div>
                <h4>Title</h4>
                <p>{data.title}</p>
                <h4>Description</h4>
                <p 
                    ref={descriptionRef}
                    id="description-review" 
                    className={showDescription ? '' : 'clamped-text'}
                >
                    {data.description}
                </p>
                {isDescriptionClamped && (
                    <button 
                        type="button" 
                        onClick={() => setShowDescription(!showDescription)} 
                        className="helper-button"
                        aria-expanded={showDescription}
                        aria-controls="description-review"
                    >
                        {showDescription ? 'Show less' : 'Show all'}
                    </button>
                )}
                <h4>Type</h4>
                <p>{data.type}</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>{specimenCount} specimen</h3>
                    <button type="button" onClick={onEditSpecimens} className="helper-button">Edit</button>
                </div>
                <div id="specimen-list">
                {shownSpecimen.map((specimen: string) => {
                    return (
                        <p key={specimen}>{specimen}</p>
                    )
                })}
                </div>
                {hasTooManySpecimens &&
                    <button 
                    type="button" 
                    onClick={() => setShowAllSpecimen(!showAllSpecimen)} 
                    className="helper-button"
                    aria-expanded={showAllSpecimen}
                >
                    {showAllSpecimen ? 'Show less' : 'Show all'}
                </button>
                }
                
            </div>
        </div>
    )
}

export default ConfirmView;