/* Import Dependencies */
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

/* Import Types */
import { DropdownItem } from "app/Types";


/* Props Type */
interface Props {
    items: {
        label: string,
        value: string,
        action?: Function
    }[],
    selectedItem?: {
        label: string,
        value: string,
    },
    placeholder?: string,
    hasDefault?: boolean,
    disabled?: boolean,
    useAsFilter?: boolean,
    styles?: {
        color?: string,
        textColor?: string,
        background?: string,
        border?: boolean,
        borderRadius?: string
    },
    OnChange?: Function
};


/** Component that renders a default dropdown with selectable items, each item will trigger an action
    * @param items An array of items to be rendered, an item consists of a label, value and action
    * @param selectedItem The currently selected item, holds a label and value
    * @param placeholder A possible placeholder to display in the field when no option is selected
    * @param hasDefault Boolean indicating if the dropdown alwyas has a default value
    * @param disabled Boolean indicating if the dropdown should be disabled
    * @param useAsFilter Boolean indicating if the dropdown should be used as a filter
    * @param styles A possible object that can hold rules for adhering to certain styles
    * @param OnChange A global function that triggers when an option is selected, has priority over an action of an option
*/
const Dropdown = (props: Props) => {
    const { selectedItem, items, placeholder, hasDefault, disabled, useAsFilter, styles, OnChange } = props;

    /* Base variables */
    const [selectItems, setSelectItems] = useState<{ label: string, value: string, action?: Function }[]>(items);

    /**
     * Function to check if the chosen option has a value and the default should change to 'Reset filter'
     * @param option The selected option from the Select Component
     */
    const CheckItems = (option: SingleValue<DropdownItem> | undefined) => {
        if (useAsFilter && (option?.value || selectedItem) && !selectItems.find((item) => item.label === 'Reset filter')) {
            if (!hasDefault && selectItems[0].label !== placeholder) {
                selectItems.unshift({
                    label: 'Reset filter',
                    value: ""
                });
            } else if (!hasDefault) {
                selectItems[0].label = 'Reset filter';
            }
        } else if (!option?.value && selectItems.find((item) => item.label === 'Reset filter')) {
            selectItems[0].label = placeholder ?? 'Select an option';
        }

        setSelectItems([...selectItems]);
    };

    useEffect(() => {
        CheckItems(selectedItem);
    }, [selectedItem]);

    return (
        <Select value={selectedItem}
            placeholder={placeholder}
            options={selectItems}
            isSearchable={false}
            isDisabled={disabled}
            styles={{
                control: provided => ({
                    ...provided,
                    backgroundColor: styles?.background ?? '#F9FAFC',
                    borderRadius: styles?.borderRadius ?? 'none',
                    borderColor: styles?.border ? '#D9D9DF' : 'transparent',
                    minHeight: 'auto',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    paddingLeft: '0.8rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.325rem',
                    paddingBottom: '0.325rem',
                    ":hover": {
                        borderColor: `${styles?.color}`
                    },
                    ":active": {
                        borderColor: `${styles?.color}`
                    }
                }),
                menu: provided => ({
                    ...provided,
                    zIndex: 9999,
                    fontSize: '0.875rem',
                    width: '100%',
                    position: 'absolute',
                    right: '0',
                    color: styles?.textColor ?? '#333333'
                }),
                placeholder: provided => ({
                    ...provided,
                    color: styles?.textColor ?? '#333333'

                }),
                dropdownIndicator: provided => ({
                    ...provided,
                    color: styles?.textColor ?? '#333333',
                    fontSize: '0.875rem'
                }),
                singleValue: provided => ({
                    ...provided,
                    color: styles?.textColor ?? '#333333'
                }),
                valueContainer: provided => ({
                    ...provided,
                    width: 'max-content',
                    padding: '0px'
                }),
                clearIndicator: provided => ({
                    ...provided,
                    padding: '0px'
                }),
                indicatorsContainer: provided => ({
                    ...provided,
                    height: '1.5rem'
                }),
                input: provided => ({
                    ...provided,
                    margin: '0px'
                }),
                indicatorSeparator: provided => ({
                    ...provided,
                    display: 'none'
                }),
                option: (provided, state) => ({
                    ...provided,
                    width: '100%',
                    color: '#333333',
                    backgroundColor: (state.isSelected && styles?.color) ? styles.color : undefined,
                    ":hover": {
                        backgroundColor: !state.isSelected ? '#f1f1f3' : undefined
                    },
                    fontWeight: state.isSelected ? 'bold' : '',
                    cursor: 'pointer'
                })

            }}
            onChange={(option: SingleValue<DropdownItem>) => {
                OnChange ? OnChange(option) : option?.action?.();
                CheckItems(option);
            }}
        />
    );
};

export default Dropdown;