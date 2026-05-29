/* Import dependecies */
import { ChangeEvent } from "react";

/* Import styling */
import "./Views.scss";

/* SpecimenView interface */
interface SpecimenViewProps {
    data: {
        specimenRawList: string;
        specimens: string[];
    };
    onUpdate: (fields: Partial<{ specimenRawList: string; specimens: string[] }>) => void;
    wasValidated: boolean;
}

/**
 * The Specimen View
 * @returns A JSX element that contains the Specimen View for the Multi Step Form
 */
const SpecimenView = ({data, onUpdate, wasValidated}: SpecimenViewProps) => {
    /* Base variables */
    const areSpecimensInvalid = wasValidated && !data.specimenRawList.trim();

    /* Function to update the specimenRawList field in the store on input change */
    const handleOnChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onUpdate({ specimenRawList: e.target.value });
    }

    /* Function to transform string to array of strings, clean it and check for duplicate items */
    const handleOnBlurTextarea = () => {
        /* Regex depicts a split on either new line, comma or semicolon */
        const rawArray = data.specimenRawList.split(/[\n,;]+/);
        const cleanArray = rawArray
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        const uniqueDOIs = [...new Set(cleanArray)];
        
        onUpdate({ specimens: uniqueDOIs });
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
            <fieldset className="input-group">
                <label htmlFor="form-specimen">Specimen DOIs</label>
                <textarea 
                    id="form-specimen" 
                    name="specimen" 
                    value={data.specimenRawList}
                    onChange={handleOnChangeTextarea}
                    onBlur={handleOnBlurTextarea}
                    required
                    maxLength={2048}
                    aria-describedby="specimen-error"
                    aria-invalid={areSpecimensInvalid ? "true" : "false"}
                    placeholder="Paste list of specimen DOIs here..."
                />
                <div className="form-error" id="specimen-error" aria-live="polite">
                    <p>Please enter the specimen DOIs for this Virtual Collection</p>
                </div>
            </fieldset>
        </div>
    )
}

export default SpecimenView;