/* Import styling */
import "./Views.scss";

/* AboutView interface */
interface AboutViewProps {
    data: { title: string; description: string, type: string };
    onUpdate: (fields: Partial<{ title: string; description: string, type: string }>) => void;
    wasValidated: boolean;
}

/**
 * The About View
 * @returns A JSX element that contains the About View for the Multi Step Form
 */
const AboutView = ({data, onUpdate, wasValidated}: AboutViewProps) => {
    /* Base variables */
    const isTitleInvalid = wasValidated && !data.title.trim();
    const isDescriptionInvalid = wasValidated && !data.description.trim();

    return (
        <div id="about-view" className="form-view-container">
            <h2>About this collection</h2>
            <p>Enter title, description and the type of your virtual collection. In the next step, you can add the list of specimens to include in this collection.</p>

            <div className="input-group">
                <label htmlFor="form-title" className="form-label">Title</label>
                <input 
                    type="text"
                    id="form-title"
                    name="title"
                    value={data.title} 
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    required
                    maxLength={128}
                    aria-describedby="title-error"
                    aria-invalid={isTitleInvalid ? "true" : "false"}
                    placeholder="Short and concise. Max 128 chars."
                    className="form-input"
                />
                <div className="form-error" id="title-error" aria-live="polite">
                    <p>Please enter a title.</p>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="form-description" className="form-label">Description</label>
                <textarea 
                    id="form-description"
                    name="description" 
                    value={data.description} 
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    required
                    maxLength={2048}
                    aria-describedby="description-error"
                    aria-invalid={isDescriptionInvalid ? "true" : "false"}
                    placeholder="Describe the collection. You may include aspects such as the purpose of the collection, geographic / taxonomic limitations, included species etc. Max 2048 chars."
                    className="form-input"
                />
                <div className="form-error" id="description-error" aria-live="polite">
                    <p>Please describe your virtual collection.</p>
                </div>
            </div>

            <div className="reference-type">
                <span className="form-label">Type</span>
                <div className='reference-type-wrapper'>
                    <div className="reference-type-label">
                        <p className="reference-type-title">Reference Collection</p>
                        <p className="reference-type-description">When publishing a gold-standard collection for others to use as an identification key.</p>
                    </div>
                </div>

                <p id="form-type-subtitle" className="form-note">
                    Note: only Reference Collections are available at this time. Community Collections will be introduced in a future update.
                </p>
            </div>
        </div>
    )
}

export default AboutView;