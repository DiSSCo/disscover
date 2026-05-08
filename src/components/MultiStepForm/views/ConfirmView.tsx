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

    return (
        <div id="confirm-view">
            <h2>Review and confirm</h2>
            <p>Please the review collection details and create your collection when ready.</p>

            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Title</h3>
                    <a href="*">Edit</a>
                </div>
                
                <p>{title}</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Description</h3>
                    <a href="*">Edit</a>
                </div>
                <p>{description}</p>
            </div>
            <div className="form-review-container">
                <h3>Type</h3>
                <p>{type}</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Specimens</h3>
                    <a href="*">Edit</a>
                </div>
                <p>{specimen}</p>
            </div>
        </div>
    )
}

export default ConfirmView;