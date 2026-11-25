import { Button, Card } from "@radix-ui/themes";

/* Import styling */
import './Popups.scss';

type AddAnnotationProps = {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleCancel: () => void;
    handleSubmit: () => void;
}

export const AddVisualAnnotationPopup = ({ inputValue, setInputValue, handleCancel, handleSubmit }: AddAnnotationProps) => {
    return (
        <Card className="add-annotation-popup">
            <input
                type="text"
                placeholder="Annotation value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-input"
            />
            <div className="add-annotation-popup-controls">
                <Button 
                    onClick={handleCancel} 
                    variant="soft"
                    color="gray"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} >
                    Submit annotation
                </Button>
            </div>
            <p className="add-annotation-footer">All annotations are public. By submitting you agree to our <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode.en" target="_blank">CC-0 license</a> and Annotation Policy.</p>
        </Card>
    )
}