/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FieldArray, Field } from "formik";
import { useRef, useState } from "react";
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useFocus, useSearchFilters } from "app/Hooks";

/* Import Types */
import { MultiSelectItem } from "app/Types";

/* Import Icons */
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

/* Import Styling */
import styles from './multiSelect.module.scss';

/* Import Components */
import { Button } from "../CustomUI";


/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    items: MultiSelectItem[],
    fieldValues: string[],
    enableInputField?: boolean,
    SetFieldValue: Function,
    OnSelect?: Function,
    OnChange?: Function
};


/**
 * Component that renders a multi select field which allows for selecting multiple items from a dropdown
 * @param name The name of the form field in question
 * @param items The multi select items to be visible in the dropdown
 * @returns JSX Component
 */
const MultiSelect = (props: Props) => {
    const { name, namePrefix, items, fieldValues, enableInputField, SetFieldValue, OnSelect, OnChange } = props;

    /* Hooks */
    const searchFilters = useSearchFilters();

    /* Base variables */
    const [multiSelectTrigger, setMultiSelectTrigger] = useState<boolean>(false);

    /* Set focus on multi select */
    const multiSelectRef = useRef<HTMLDivElement>(null);
    useFocus({
        ref: multiSelectRef,
        OnFocusLose: () => setMultiSelectTrigger(false)
    });

    /**
     * Class Names function for select item
     * @param itemName The name of the search item
     * @param itemValue The value of the item
     * @returns Class Name
     */
    const SelectItemClass = (itemName: string, itemValue: string) => {
        const selected: boolean = searchFilters.CheckSearchFilter(itemName, itemValue);

        return classNames({
            "hover-grey": !selected,
            "bgc-grey": selected
        });
    };

    /* Class Names */
    const multiSelectListClass = classNames({
        "d-block": multiSelectTrigger,
        "d-none": !multiSelectTrigger
    });

    return (
        <div ref={multiSelectRef}>
            <FieldArray name={`filters.${name}`}>
                {({ push, remove }) => (
                    <Row>
                        <Col>
                            <div className="position-relative">
                                <Row>
                                    {/* Visible select field */}
                                    <Col className="position-relative d-flex align-items-center">
                                        <Field name={`search.${name}`}
                                            placeholder={enableInputField ? 'Select or type' : 'Select'}
                                            className={`${styles.inputField} w-100 fs-4 px-3 py-1 b-primary br-round`}
                                            readOnly={!enableInputField}
                                            onChange={(field: {
                                                target: {
                                                    value: string
                                                }
                                            }) => {
                                                /* Set field value */
                                                SetFieldValue(`search.${name}`, field.target.value);

                                                /* Trigger OnChange event if present */
                                                OnChange?.(field.target.value);
                                            }}
                                            onClick={() => setMultiSelectTrigger(true)}
                                        />

                                        {/* Absolute chevron down */}
                                        <Button type="button"
                                            variant="blank"
                                            className="position-absolute end-0 me-1"
                                            OnClick={() => setMultiSelectTrigger(!multiSelectTrigger)}
                                        >
                                            <FontAwesomeIcon icon={multiSelectTrigger ? faChevronUp : faChevronDown}
                                                className="tc-primary"
                                            />
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Absolute positioned select list */}
                                <div className={`${multiSelectListClass} bgc-white b-primary br-corner mt-2 px-2 py-1 z-1`}>
                                    {items.map((item) => (
                                        <button key={item.value}
                                            type="button"
                                            className="button-no-style"
                                            onClick={() => {
                                                /* Check if index is present in field values, if not push to array, otherwise remove */
                                                const index: number = fieldValues.findIndex(fieldValue => fieldValue === item.value);

                                                if (index >= 0) {
                                                    remove(index);
                                                } else {
                                                    push(item.value);
                                                };

                                                /* Execute default select action, if present */
                                                OnSelect?.();
                                            }}
                                        >
                                            <Row key={item.value}>
                                                <Col>
                                                    <div className={`${SelectItemClass(name, item.value)} px-2 py-1 br-corner tr-fast`}>
                                                        <Row>
                                                            <Col lg="auto"
                                                                className="pe-0 d-flex align-items-center"
                                                            >
                                                                <Field name={`${namePrefix + '.' ?? ''}${name}`}
                                                                    type="checkbox"
                                                                    value={item.value}
                                                                />
                                                            </Col>
                                                            <Col className="d-flex align-items-center">
                                                                <p className="fs-5">{item.label}</p>
                                                            </Col>
                                                            {item.count &&
                                                                <Col lg="auto"
                                                                    className="d-flex align-items-center"
                                                                >
                                                                    <p className="fs-5">{item.count}</p>
                                                                </Col>
                                                            }
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
            </FieldArray>
        </div>
    );
};

export default MultiSelect;