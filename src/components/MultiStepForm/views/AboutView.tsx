/* Import components */
import { RadioCards } from "@radix-ui/themes";

/* Import styling */
import "./Views.scss";

/* Import store */
import { useVirtualCollectionStore } from 'store/useVirtualCollectionStore';

/**
 * The About View
 * @returns A JSX element that contains the About View for the Multi Step Form
 */
const AboutView = () => {
    /* Base variables from the Virtual Collection store */
    const title = useVirtualCollectionStore((state) => state.formData.title);
    const description = useVirtualCollectionStore((state) => state.formData.description);
    const type = useVirtualCollectionStore((state) => state.formData.type);
    const updateField = useVirtualCollectionStore((state) => state.updateField);

    return (
        <div id="about-view" className="form-view-container">
            <h2>About this collection</h2>
            <p>Enter title, description and the type of your virtual collection. In the next step, you can add the list of specimens to include in this collection.</p>

            {/* TITLE FIELD */}
            <div className="input-group">
                <label htmlFor="form-title">Title</label>
                <input 
                    type="text"
                    id="form-title"
                    name="title"
                    value={title} 
                    onChange={(e) => updateField('title', e.target.value)}
                    required
                    maxLength={128}
                    aria-describedby="title-error"
                    placeholder="Short and concise. Max 128 chars."
                />
                <div className="form-error" id="title-error" aria-live="polite">
                    <p>Please enter a title.</p>
                </div>
            </div>

            {/* DESCRIPTION FIELD */}
            <div className="input-group">
                <label htmlFor="form-description">Description</label>
                <textarea 
                    id="form-description"
                    name="description" 
                    value={description} 
                    onChange={(e) => updateField('description', e.target.value)}
                    required
                    maxLength={2048}
                    aria-describedby="description-error"
                    placeholder="Describe the collection. You may include aspects such as the purpose of the collection, geographic / taxonomic limitations, included species etc. Max 2048 chars."
                />
                <div className="form-error" id="description-error" aria-live="polite">
                    <p>Please describe your virtual collection.</p>
                </div>
            </div>

            <label htmlFor="form-type">Type</label>
            <RadioCards.Root id="form-type" name="type">
                <RadioCards.Item 
                    value="Reference Collection" 
                    checked
                    onChange={(e) => updateField('type', (e.target as HTMLInputElement).value)}
                >
                    <h4>{type}</h4>
                    <p>When publishing a gold-standard collection for others to use as an identification key.</p>
                </RadioCards.Item>
            </RadioCards.Root>
            <p id="form-type-subtitle">Note: only Reference Collections are available at this time. Community Collections will be introduced in a future update.</p>
        </div>
    )
}

export default AboutView;