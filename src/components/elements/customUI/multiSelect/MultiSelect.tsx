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
    searchName?: string,
    items: MultiSelectItem[],
    fieldValues: string[],
    listPosition?: 'static' | 'absolute',
    enableInputField?: boolean,
    allowMultiSelectAtOnce?: boolean,
    alwaysDisplayActiveItems?: boolean,
    SetFieldValue: Function,
    OnClick?: Function,
    OnSelect?: Function,
    OnChange?: Function
};


/**
 * Component that renders a multi select field which allows for selecting multiple items from a dropdown
 * @param name The name of the form field in question
 * @param namePrefix The prefix where in the name is nested
 * @param searchName The name used for the search field
 * @param items The multi select items to be visible in the dropdown
 * @param fieldValues The values of all of the taxonomy related fields in the form
 * @param listPosition The CSS position of the list, either static or absolute
 * @param enableInputField If true, will enable the input field to be used for searching
 * @param allowMultiSelectAtOnce If true, will enable multiple options to be selected before losing focus
 * @param alwaysDisplayActiveItems If true, will always display the selected items in the dropdown
 * @param SetFieldValue Function to set a value of specific form field
 * @param OnClick Function that should be called when the user clicks on the input field
 * @param OnSelect Function that should be callled when an option from the multi select is selected
 * @param OnChange Function that should be called when a change in the input field occurs
 * @returns JSX Component
 */
const MultiSelect = (props: Props) => {
    const {
        name, namePrefix, searchName, items, fieldValues, listPosition, enableInputField, allowMultiSelectAtOnce, alwaysDisplayActiveItems,
        SetFieldValue, OnClick, OnSelect, OnChange
    } = props;

    /* Hooks */
    const searchFilters = useSearchFilters();

    /* Base variables */
    const [multiSelectTrigger, setMultiSelectTrigger] = useState<boolean>(false);
    let multiSelectItems = [...items];

    /* Set focus on multi select */
    const multiSelectRef = useRef<HTMLDivElement>(null);
    useFocus({
        ref: multiSelectRef,
        OnFocusLose: () => setMultiSelectTrigger(false)
    });

    /* If required to always display active items, filter items when focus is inactive on selected items */
    if (alwaysDisplayActiveItems && !multiSelectTrigger) {
        multiSelectItems = multiSelectItems.filter(item => searchFilters.CheckSearchFilter(name, item.value));
    };

    /**
     * Function that fires when an item has been selected
     * @param item The item that has been selected
     * @param Push A function that pushes the selected item to the form field array
     * @param Remove A function that removes the selected item from the form field array
     */
    const SelectItem = (item: MultiSelectItem, Push: Function, Remove: Function) => {
        /* Check if index is present in field values, if not push to array, otherwise remove */
        const index: number = fieldValues.findIndex(fieldValue => fieldValue === item.value);

        if (index >= 0) {
            Remove(index);
        } else {
            Push(item.value);
        };

        /* Close items list */
        !allowMultiSelectAtOnce && setMultiSelectTrigger(false);

        /* Execute default select action, if present */
        OnSelect?.();
    };

    /* Class Names */
    const MultiSelectListClass = (items: MultiSelectItem[]) => {
        return classNames({
            "d-block": multiSelectTrigger,
            "d-none": !multiSelectTrigger && (!alwaysDisplayActiveItems || !items.find(item => searchFilters.CheckSearchFilter(name, item.value))) || !multiSelectItems.length,
            [`position-${listPosition}`]: listPosition
        });
    };

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

    return (
        <div ref={multiSelectRef}>
            <FieldArray name={`${namePrefix}.${name}`}>
                {({ push, remove }) => (
                    <Row>
                        <Col>
                            <div className="position-relative">
                                <Row>
                                    {/* Visible select field */}
                                    <Col className="position-relative d-flex align-items-center">
                                        <Field name={`search.${searchName ?? name}`}
                                            placeholder={enableInputField ? 'Select or type' : 'Select'}
                                            className={`${styles.inputField} w-100 fs-4 px-3 py-1 b-primary br-round`}
                                            readOnly={!enableInputField}
                                            onChange={(field: {
                                                target: {
                                                    value: string
                                                }
                                            }) => {
                                                /* Set field value */
                                                SetFieldValue(`search.${searchName ?? name}`, field.target.value);

                                                /* Trigger OnChange event if present */
                                                OnChange?.(field.target.value);
                                            }}
                                            onClick={() => {
                                                setMultiSelectTrigger(true);
                                                OnClick?.(true);
                                            }}
                                        />

                                        {/* Absolute chevron up or down */}
                                        <Button type="button"
                                            variant="blank"
                                            className="position-absolute end-0 me-1"
                                            OnClick={() => {
                                                setMultiSelectTrigger(!multiSelectTrigger);
                                                OnClick?.();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={multiSelectTrigger ? faChevronUp : faChevronDown}
                                                className="tc-primary"
                                            />
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Select list */}
                                <div className={`${MultiSelectListClass(multiSelectItems)} bgc-white b-primary br-corner mt-2 px-2 py-1 z-1`}>
                                    {multiSelectItems.map((item) => (
                                        <button key={item.value}
                                            type="button"
                                            className="button-no-style"
                                            onClick={() => SelectItem(item, push, remove)}
                                        >
                                            <Row key={item.value}>
                                                <Col>
                                                    <div className={`${SelectItemClass(name, item.value)} px-2 py-1 br-corner tr-fast`}>
                                                        <Row>
                                                            <Col lg="auto"
                                                                className="pe-0 d-flex align-items-center"
                                                            >
                                                                <Field name={`${namePrefix ? namePrefix + '.' : ''}${name}`}
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