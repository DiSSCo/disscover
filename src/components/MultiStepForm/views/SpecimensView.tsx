/* Import styling */
import { ChangeEvent } from "react";
import "./Views.scss";
import { useVirtualCollectionStore } from "store/useVirtualCollectionStore";

/**
 * The Specimen View
 * @returns A JSX element that contains the Specimen View for the Multi Step Form
 */
const SpecimenView = () => {
    /* Base variables from the Virtual Collection store */
    const specimenRawList = useVirtualCollectionStore((state) => state.formData.specimenRawList);
    const updateField = useVirtualCollectionStore((state) => state.updateField);

    /* Function to update the specimenRawList field in the store on input change */
    const handleOnChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateField('specimenRawList', e.target.value);
    }

    /* Function to transform string to array of strings, clean it and check for duplicate items */
    const handleOnBlurTextarea = () => {
        const rawArray = specimenRawList.split(/[\n,;]+/);
        const cleanArray = rawArray
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);
        const uniqueDOIs = [...new Set(cleanArray)];
        
        updateField('specimen', uniqueDOIs);
    }

    return (
        <div id="specimen-view" className="form-view-container">
            <h2>Link specimen to collection</h2>
            <ul>
                <li>Paste your list of specimen identifiers or DOIs below</li>
                <li>The identifiers / DOIs must be <b>globally unique</b> and <b>available in DiSSCo.</b></li>
                <li>Separate items by line breaks, commas, or semicolons.</li>
            </ul>

            {/* SPECIMEN FIELD */}
            <div className="input-group">
                <label htmlFor="form-specimen">Specimen DOIs</label>
                <textarea 
                    id="form-specimen" 
                    name="specimen" 
                    value={specimenRawList}
                    onChange={handleOnChangeTextarea}
                    onBlur={handleOnBlurTextarea}
                    required
                    maxLength={2048}
                    aria-describedby="specimen-error"
                    placeholder="Paste list of specimen DOIs here..."
                />
                <div className="form-error" id="specimen-error" aria-live="polite">
                    <p>Please enter the specimen DOIs for this Virtual Collection</p>
                </div>
            </div>
        </div>
    )
}

export default SpecimenView;