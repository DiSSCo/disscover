import { useState } from "react";
import { useVirtualCollectionStore } from "store/useVirtualCollectionStore";

/**
 * The Confirm View
 * @returns A JSX element that contains the Confirm View for the Multi Step Form
 */
const ConfirmView = () => {
    /* Base variables from the Virtual Collection store */
    const title = useVirtualCollectionStore((state) => state.formData.title);
    const description = useVirtualCollectionStore((state) => state.formData.description);
    const type = useVirtualCollectionStore((state) => state.formData.type);
    const specimen = useVirtualCollectionStore((state) => state.formData.specimen);
    const [showDescription, setShowDescription] = useState(false);
    const [showAllSpecimen, setShowAllSpecimen] = useState(false);
    const shownSpecimen = specimen.length > 2 && !showAllSpecimen ? specimen.slice(0, 3) : specimen;

    return (
        <div id="confirm-view" className="form-view-container">
            <h2>Review and confirm</h2>
            <p>Please the review collection details and create your collection when ready.</p>

            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>About</h3>
                    <a href="*">Edit</a>
                </div>
                <h4>Title</h4>
                <p>{title}</p>
                <h4>Description</h4>
                <p id={showDescription ? '' : "description-review"}>{description}</p>
                <button type="button" onClick={() => {setShowDescription(!showDescription)}} className="helper-button">{showDescription ? 'Show less' : 'Show all'}</button>
                <h4>Type</h4>
                <p>{type}</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h4>Specimens</h4>
                    <a href="*">Edit</a>
                </div>
                <div id="specimen-list">
                {shownSpecimen.map((specimen: string) => {
                    return (
                        <p key={specimen}>{specimen}</p>
                    )
                })}
                </div>
                {specimen.length > 3 &&
                    <button onClick={() => {setShowAllSpecimen(!showAllSpecimen)}} type="button" className="helper-button">{showAllSpecimen ? 'Show less' : 'Show all'}</button>
                }
                
            </div>
        </div>
    )
}

export default ConfirmView;