/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FieldArray } from 'formik';
import { Capitalize } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import SelectOption from './SelectOption';


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

    return (
        <Row className="mt-2 px-2">
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
                                return <SelectOption key={item[0]}
                                    searchFilter={searchFilter}
                                    item={item}
                                    method={() => remove(index)}
                                    selected={true}
                                />
                            })}

                            {/* Search bar for searching in optional Items */}
                            {/* Disabled untill further notice: <Field name={`${formField}Search`}
                                className="w-100"
                            /> */}

                            {/* Optional Items to select */}
                            {filteredItems.selectable.map((item) => {
                                return <SelectOption key={item[0]}
                                    searchFilter={searchFilter}
                                    item={item}
                                    method={() => push(item[0])}
                                />
                            })}
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default MultiSelectFilter;