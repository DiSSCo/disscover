import { Button, Card } from "@radix-ui/themes";

/* Import styling */
import './AddAnnotationPopup.scss';

type AddAnnotationProps = {
    isEditing: any;
    inputValue: any;
    setInputValue: any;
    setIsEditing: any;
    handleCancel: any;
    handleSubmit: any;
}

export const AddAnnotationPopup = ({ isEditing, inputValue, setInputValue, setIsEditing, handleCancel, handleSubmit }: AddAnnotationProps) => {
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
                    onClick={() => {
                        if (isEditing) {
                            setIsEditing(false);
                        } else {
                            handleCancel();
                        }
                    }} 
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