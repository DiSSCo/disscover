/* Import components */
import { TextArea } from "@radix-ui/themes";

/* Import styling */
import "./Views.scss";

/**
 * The Specimen View
 * @returns A JSX element that contains the Specimen View for the Multi Step Form
 */
const SpecimenView = () => {
    return (
        <div id="specimen-view">
            <h2>Link specimen to collection</h2>
            <ul>
                <li>Paste your list of specimen identifiers or DOIs below</li>
                <li>The identifiers / DOIs must be <b>globally unique</b> and <b>available in DiSSCo.</b></li>
                <li>Separate items by line breaks, commas, or semicolons.</li>
            </ul>

            <label htmlFor="form-description">Specimen DOIs</label>
            <TextArea id="form-description" name="description" placeholder="Paste list of specimen identifiers or DOIs here..." />
        </div>
    )
}

export default SpecimenView;