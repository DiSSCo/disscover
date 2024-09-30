/* Import Dependencies */
import classNames from "classnames";
import { Row, Col } from "react-bootstrap";

/* Import Components */
import { Button } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    fieldValues: string[],
    SetFieldValue?: Function,
    SubmitForm: Function
};


/**
 * Component that renders a boolean based filter that can be used in the search filters menu
 * @param name The name of the search filter form field
 * @param namePrefix A possible prefix under which the form field' name is stored in the form state
 * @param fieldValues The selected field values in the form
 * @param SetFieldValue Function to set the value of a form field
 * @param SubmitForm Function to submit the form
 * @returns JSX Component
 */
const BooleanFilter = (props: Props) => {
    const { name, namePrefix, fieldValues, SetFieldValue, SubmitForm } = props;

    /* Function to determine boolean filter Class Name */
    const BooleanFilterClass = (value: 'true' | 'false') => {
        return classNames({
            'tc-black bgc-white hover-primary': fieldValues[0] !== value
        });
    };

    return (
        <div>
            <Row>
                <Col className="pe-0">
                    <Button type="button"
                        variant="primary"
                        className={`${BooleanFilterClass('true')} w-100 py-1 b-primary br-corner`}
                        OnClick={() => {
                            /* Set the field value to true */
                            SetFieldValue?.(`${namePrefix ? `${namePrefix}.` : ''}${name}[0]`, fieldValues[0] !== 'true' ? 'true' : undefined);

                            /* Submit form */
                            SubmitForm();
                        }}
                    >
                        True
                    </Button>
                </Col>
                <Col>
                    <Button type="button"
                        variant="primary"
                        className={`${BooleanFilterClass('false')} w-100 b-primary py-1 br-corner`}
                        OnClick={() => {
                            /* Set the field value to false */
                            SetFieldValue?.(`${namePrefix ? `${namePrefix}.` : ''}${name}[0]`, fieldValues[0] !== 'false' ? 'false' : undefined);

                            /* Submit form */
                            SubmitForm();
                        }}
                    >
                        False
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default BooleanFilter;