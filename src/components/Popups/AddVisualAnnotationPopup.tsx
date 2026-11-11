import { Button, Card } from "@radix-ui/themes";

/* Import styling */
import './Popups.scss';

type AddAnnotationProps = {
    inputValue: any;
    setInputValue: any;
    handleCancel: any;
    handleSubmit: any;
}

export const AddVisualAnnotationPopup = ({ inputValue, setInputValue, handleCancel, handleSubmit }: AddAnnotationProps) => {
    return (
        <Card className="add-annotation-popup">
            <input
                type="text"
                placeholder="Annotation value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
            <p className="add-annotation-footer">All annotations are public. By submitting you agree to our CC-0 license and Annotation Policy.</p>
        </Card>
    )
}