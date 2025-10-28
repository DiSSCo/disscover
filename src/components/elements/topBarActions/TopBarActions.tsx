/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { DropdownItem } from "app/Types";

/* Import Icons */
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { Button, Dropdown } from "../customUI/CustomUI";
import { useAppDispatch, useAppSelector } from "app/Hooks";
import { getAnnotationMode, setAnnotationMode } from "redux-store/AnnotateSlice";


/* Props Type */
type Props = {
    actionDropdownItems: DropdownItem[],
};


/**
 * Component that renders the actions of the top bar on the digital specimen and media pages
 * @param actionDropdownItems A list of action items to appear in the actions dropdown
 * @returns JSX Component
 */
export const TopBarActions = (props: Props) => {
    const { actionDropdownItems } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotationMode = useAppSelector(getAnnotationMode);

    return (
        <div>
            <Row className="flex-row-reverse">
                <Col lg="auto">
                    <Dropdown items={actionDropdownItems}
                        hasDefault={true}
                        selectedItem={{
                            label: 'Actions',
                            value: ''
                        }}
                        placeholder="Actions"
                        styles={{
                            color: '#f1f1f3',
                            textColor: '#ffffff',
                            background: '#4d59a2',
                            borderRadius: '999px'
                        }}
                    />
                </Col>
                <Col lg="auto"
                    className="tourAnnotate3 tourMas3 pe-1"
                >
                    <Button type="button"
                        variant="primary"
                        OnClick={() => dispatch(setAnnotationMode(!annotationMode))}
                    >
                        <span>
                            {annotationMode ? 'Stop annotating' : 'Annotate'}
                            <FontAwesomeIcon icon={faPenToSquare}
                                className="ms-2"
                            />
                        </span>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};
