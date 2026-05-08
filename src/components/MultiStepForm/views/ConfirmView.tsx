/**
 * The Confirm View
 * @returns A JSX element that contains the Confirm View for the Multi Step Form
 */
const ConfirmView = () => {
    return (
        <div id="confirm-view">
            <h2>Review and confirm</h2>
            <p>Please the review collection details and create your collection when ready.</p>

            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Title</h3>
                    <a href="*">Edit</a>
                </div>
                
                <p>Fake title here</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Description</h3>
                    <a href="*">Edit</a>
                </div>
                <p>Fake description here</p>
            </div>
            <div className="form-review-container">
                <h3>Type</h3>
                <p>Fake type here</p>
            </div>
            <div className="form-review-container">
                <div className="form-review-header">
                    <h3>Specimens</h3>
                    <a href="*">Edit</a>
                </div>
                <p>Fake specimens here</p>
            </div>
        </div>
    )
}

export default ConfirmView;