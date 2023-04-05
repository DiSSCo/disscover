/* Import Dependencies */
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { FieldArray, Field } from "formik";
import { Capitalize } from "global/Utilities";
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Typing */
interface Props {
    searchFilter: string,
    items: [],
    selectedItems: string[],
    searchQuery: string
};

const MultiSelectFilter = (props: Props) => {
    const {
        searchFilter,
        items,
        selectedItems,
        searchQuery
    } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base Variables */
    const [filteredItems, setFitleredItems] = useState<{ selected: [string, number][], selectable: [string, number][] }>({ selected: [], selectable: [] });
    const filterName = Capitalize(searchFilter.replace(/([A-Z])/g, ' $1').trim());

    /* OnChange of Selected Items or Search Query, filter selectable Items*/
    useEffect(() => {
        const filteredItems: { selected: [string, number][], selectable: [string, number][] } = {
            selected: [],
            selectable: []
        };

        Object.entries(items).forEach((item: [string, number]) => {
            if (selectedItems.includes(item[0])) {
                filteredItems.selected.push(item);
            } else {
                filteredItems.selectable.push(item);
            }
        });

        setFitleredItems(filteredItems);
    }, [items, selectedItems, searchQuery]);

    /* Onchange of selected Items, filter by */
    useEffect(() => {
        /* If length of selected and search filters do not comply, empty search filters */
        if (selectedItems.length < searchParams.getAll(searchFilter).length) {
            searchParams.delete(searchFilter);
        }

        /* Append or update search filter param foreach checked Item */
        selectedItems.forEach((selectedItem) => {
            if (!searchParams.getAll(searchFilter).includes(selectedItem)) {
                searchParams.append(searchFilter, selectedItem);
            }
        });

        setSearchParams(searchParams);
    }, [selectedItems]);

    /* Select Item Template */
    const SelectItem = (item: [string, number], method: Function, selected?: boolean) => {
        return (
            <Row key={item[0]} className={`${selected ? styles.filterSelectedList : ''} 
                ${styles.filterSelectOption} d-flex justify-content-center align-items-center`}
                onClick={() => method()}
            >
                <Col className="col-md-auto pe-0">
                    <Field name={`filters.${searchFilter}.${item[0]}`}
                        type="checkbox"
                        checked={selected}
                        onChange={() => {
                            method();
                        }}
                    />
                </Col>
                <Col>
                    <p className={`${styles.filterListItem} py-1`}> {item[0]} </p>
                </Col>
                <Col md={{ span: 3 }}>
                    <p className={styles.filterAggregation}> {item[1]} </p>
                </Col>
            </Row>
        );
    }

    return (
        <Row className="mt-2">
            <Col>
                <Row>
                    <Col>
                        <p className={`${styles.filterTitle} fw-bold`}> {filterName} </p>
                    </Col>
                </Row>

                <FieldArray name={`filters.${searchFilter}`}>
                    {({ push, remove }) => (
                        <>
                            {/* Selected Items */}
                            {filteredItems.selected.map((item, index) => {
                                return SelectItem(item, () => remove(index), true);
                            })}

                            {/* Search bar for searching in optional Items */}
                            {/* Disabled untill further notice: <Field name={`${formField}Search`}
                                className="w-100"
                            /> */}

                            {/* Optional Items to select */}
                            {filteredItems.selectable.map((item) => {
                                return SelectItem(item, () => push(item[0]));
                            })}
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default MultiSelectFilter;