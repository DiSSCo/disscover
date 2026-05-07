import { RadioCards, TextArea, TextField } from "@radix-ui/themes";

/**
 * The About View
 * @returns A JSX element that contains the About View for the Multi Step Form
 */
const AboutView = () => {
    return (
        <div>
            <h2>About this collection</h2>
            <p>Enter title, description and the type of your virtual collection. In the next step, you can add the list of specimens to include in this collection.</p>

            <label htmlFor="form-title">Title</label>
            <TextField.Root id="form-title" name="title" placeholder="Short and concise. Max 128 chars.">
                <TextField.Slot>
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="form-description">Description</label>
            <TextArea id="form-description" name="description" placeholder="Describe the collection. You may include aspects such as the purpose of the collection, geographic / taxonomic limitations, included species etc. Max 20248 chars." />

            <label htmlFor="form-type">Type</label>
            <RadioCards.Root id="form-type" name="type">
                <RadioCards.Item value="reference-collection" checked>
                    <h4>Reference collection</h4>
                    <p>When publishing a gold-standard collection for others to use as an identification key.</p>
                </RadioCards.Item>
            </RadioCards.Root>
            <p>Note: only Reference Collections are available at this time. Community Collections will be introduced in a future update.</p>
        </div>
    )
}

export default AboutView;