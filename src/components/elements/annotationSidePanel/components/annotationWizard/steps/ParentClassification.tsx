/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jp from 'jsonpath';

/* Import Utilities */
import { MakeJsonPathReadableString } from "app/utilities/SchemaUtilities";

/* Import Hooks */
import { useAppDispatch } from "app/Hooks";

/* Import Store */
import { setAnnotationTarget } from "redux-store/AnnotateSlice";

/* Import Types */
import { AnnotationTarget, ParentClass, DropdownItem, Dict, SuperClass } from "app/Types";

/* Import Icons */
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

/* Import Compoinents */
import { Button, Dropdown } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    index: number,
    parentClass: ParentClass,
    selected: boolean,
    parentClasses: ParentClass[],
    annotationTarget?: AnnotationTarget,
    formValues?: Dict,
    superClass: SuperClass,
    SetFieldValue?: Function,
    SetParentClasses: Function
};


/**
 * Component that renders a parent class selector in the second step of the annotation wizard when a parent class is missing
 * @param index The index of the class segment in the original targeted JSON path
 * @param parentClass The parent class provided and to check
 * @param selected Boolean indicating if the new instance option has been selected
 * @param parentClasses An array of all parent classes of the targeted class / term
 * @param annotationTarget The annotation target set
 * @param formValues The current values in the annotation wizard form
 * @param superClass The provided super class
 * @param SetFieldValue Function to set a value of a field in the form
 * @param SetParentClasses Function to set and update the parent classes state variable
 * @returns JSX Component
 */
const ParentClassification = (props: Props) => {
    const { index, parentClass, selected, parentClasses, annotationTarget, formValues, superClass, SetFieldValue, SetParentClasses } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const titleText: string = !selected ? `Add instance of ${parentClass.name}` : 'Currently selected';

    /* Depending on the index and previous classes, check if there was no other missing parent class and if so render the appropiate select options */
    if (index > 0 && !parentClasses[index - 1].present) {
        return <> </>;
    } else if (!parentClass.present) {
        return (
            <div className="mt-2">
                <div className="bgc-accent-soft br-corner px-3 py-1">
                    <p className="fs-4 fw-lightBold">
                        <FontAwesomeIcon icon={faCircleExclamation}
                            className="tc-grey"
                        />
                        {` Parent class '${parentClass.name}' is not present.
                                Add a new instance of '${MakeJsonPathReadableString(annotationTarget?.jsonPath ?? '')}' by
                                also adding the parent class.`
                        }
                    </p>
                </div>

                <Button type="button"
                    variant="primary"
                    disabled={selected}
                    className="fs-5 mt-3 py-1 px-3"
                    OnClick={() => {
                        if (annotationTarget) {
                            /* Set field values in form to parent class */
                            SetFieldValue?.('annotationValues', {});
                            SetFieldValue?.('motivation', 'ods:adding');
                            SetFieldValue?.('jsonPath', `${parentClass.jsonPath}[0]`);
                            SetFieldValue?.('class', {
                                label: MakeJsonPathReadableString(parentClass.jsonPath),
                                value: parentClass.jsonPath
                            });
                            SetFieldValue?.('term', undefined);

                            /* Set annotation target to parent class */
                            dispatch(setAnnotationTarget({
                                jsonPath: parentClass.jsonPath,
                                type: 'class'
                            }));
                        }
                    }}
                >
                    {titleText}
                </Button>
            </div>
        );
    } else if (parentClass.options && (!parentClass.dependent || (parentClass.dependent && formValues?.parentClassDropdownValues?.[parentClass.parentName as string] >= 0))) {
        /* Render dropdown if parent class index needs to be defined, when multiple depending ones, wait till the parent has been set to render the next one */

        /* For the lenght of index options, push a dropdown item as a selectable item */
        let dropdownItems: DropdownItem[] = [];

        for (let i = 0; i < parentClass.options; i++) {
            dropdownItems.push({
                label: `${parentClass.name} #${i + 1}`,
                value: `${i}`
            });
        };

        /* If dependen on parent, filter dropdown items accordingly to parent name */
        if (parentClass.dependent) {
            dropdownItems = dropdownItems.filter(dropdownItem => dropdownItem.label.includes(
                `${parentClass.parentName as string} ${formValues?.parentClassDropdownValues?.[parentClass.parentName as string]}`
            ));
        }

        return (
            <div className="mt-2">
                <div className="bgc-accent-soft br-corner mb-2 px-3 py-1">
                    <p className="fs-4 fw-lightBold">
                        <FontAwesomeIcon icon={faCircleExclamation}
                            className="tc-grey"
                        />
                        {` Specify on which '${parentClass.name}' the instance should be created.`}
                    </p>
                </div>

                <Dropdown items={dropdownItems}
                    placeholder="Select"
                    hasDefault={false}
                    selectedItem={formValues?.parentClassDropdownValues[parentClass.name] >= 0 ? {
                        label: `${parentClass.name} #${formValues?.parentClassDropdownValues[parentClass.name] + 1}`,
                        value: formValues?.parentClassDropdownValues[parentClass.name]
                    } : undefined}
                    styles={{
                        border: true,
                        borderRadius: '8px'
                    }}
                    OnChange={(option: DropdownItem) => {
                        /* Set selected parent index in annotation wizard form */
                        SetFieldValue?.(`parentClassDropdownValues.${parentClass.name}`, Number(option.value));

                        /* Set class as present in parent classes state */
                        parentClasses[parentClasses.findIndex(parentClassInstance => parentClassInstance.name === parentClass.name)].present = true;

                        SetParentClasses([...parentClasses]);
                    }}
                />

                {(parentClasses.filter(parentClass => formValues && parentClass.name in formValues.parentClassDropdownValues).length === parentClasses.length
                    && (index + 1) === parentClasses.length
                ) &&
                    <Button type="button"
                        variant="primary"
                        disabled={formValues?.parentClassDropdownValues[parentClass.name] <= 0 && selected}
                        className="fs-5 mt-3 py-1 px-3"
                        OnClick={() => {
                            /* Set field value in annotation form */
                            let jsonPath: string = annotationTarget?.jsonPath ?? '';
                
                            /* For values in form values parent classes, add indexes to JSON path */
                            parentClasses.forEach((parentClass) => {
                                const index: number = formValues?.parentClassDropdownValues[parentClass.name];

                                jsonPath = jsonPath.replace(parentClass.jsonPath, `${parentClass.jsonPath}[${index}]`);
                            });

                            if (jp.parse(jsonPath).slice(-1)[0].expression.value.includes('has')) {
                                const latestIndex: any = jp.query(superClass, jsonPath)[0].length;

                                jsonPath = `${jsonPath}[${latestIndex}]`;
                            }
                       
                            SetFieldValue?.('annotationValues', {});
                            SetFieldValue?.('motivation', 'ods:adding');
                            SetFieldValue?.('jsonPath', jsonPath);
                        }}
                    >
                        {titleText}
                    </Button>
                }
            </div>
        );
    }
};

export default ParentClassification;