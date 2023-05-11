/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Field, FieldArray } from 'formik';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import SelectOption from './SelectOption';
import MidsOption from './MidsOption';


/* Props Typing */
interface Props {
    filter: Dict,
    searchFilter: string,
    items: [],
    selectedItems: string[],
    searchQuery: string
};

const MultiSelectFilter = (props: Props) => {
    const {
        filter,
        searchFilter,
        items,
        selectedItems,
        searchQuery
    } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base Variables */
    const [filteredItems, setFitleredItems] = useState<{ selected: [string, number][], selectable: [string, number][] }>({ selected: [], selectable: [] });
    const [filterToggle, setFilterToggle] = useState(false);

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

    /* ClassName for Filter Block */
    const classFilterBlock = classNames({
        [`${styles.filterBlock}`]: true,
        'd-none': !filterToggle,
        'd-block': filterToggle
    });

    if (filter.filterType === 'mids') {
        return (
            <Row className="mt-2 px-2">
                <Col>
                    <Row>
                        <Col>
                            <p className={`${styles.filterTitle} fw-bold`}> {filter.displayName} </p>
                        </Col>
                    </Row>

                    <FieldArray name={`filters.${searchFilter}`}>
                        {({ push, remove }) => (
                            <Row className="mt-1">
                                {filteredItems.selected.map((item, index) => {
                                    return <MidsOption key={item[0]}
                                        searchFilter={searchFilter}
                                        item={item}
                                        method={() => remove(index)}
                                        selected={true}
                                    />
                                })}

                                {/* Optional Items to select */}
                                {filteredItems.selectable.map((item) => {
                                    return <MidsOption key={item[0]}
                                        searchFilter={searchFilter}
                                        item={item}
                                        method={() => push(item[0])}
                                    />
                                })}
                            </Row>
                        )}
                    </FieldArray>
                </Col>
            </Row>
        );
    } else {
        return (
            <Row className="mt-2 px-2">
                <Col>
                    <Row>
                        <Col>
                            <p className={`${styles.filterTitle} fw-bold`}> {filter.displayName} </p>
                        </Col>
                    </Row>

                    <Row className="mt-1">
                        <Col>
                            {/* Search bar for searching in optional Items */}
                            <div className={`${styles.filterSearchBlock} pe-2`}>
                                <Row className="align-items-center">
                                    <Col>
                                        <Field name={`${searchFilter}Search`}
                                            className={`${styles.filterSearch} w-100 px-2 py-1`}
                                            placeholder="Select or type"
                                            onFocus={() => setFilterToggle(true)}
                                        />
                                    </Col>

                                    <Col className="col-md-auto ps-0">
                                        {filterToggle ?
                                            <FontAwesomeIcon icon={faChevronUp}
                                                className="c-primary c-pointer"
                                                onClick={() => setFilterToggle(false)}
                                            />
                                            : <FontAwesomeIcon icon={faChevronDown}
                                                className="c-primary c-pointer"
                                                onClick={() => setFilterToggle(true)}
                                            />
                                        }
                                    </Col>
                                </Row>
                            </div>

                            {filterToggle &&
                                <FieldArray name={`filters.${searchFilter}`}>
                                    {({ push, remove }) => (
                                        <div className={`${classFilterBlock} mt-2 px-2 py-1`}>
                                            {/* Selected Items */}
                                            {filteredItems.selected.map((item) => {
                                                return <SelectOption key={item[0]}
                                                    searchFilter={searchFilter}
                                                    item={item}
                                                    method={() => remove(selectedItems.findIndex(selectedItem => selectedItem === item[0]))}
                                                    selected={true}
                                                />
                                            })}

                                            {/* Optional Items to select */}
                                            {filteredItems.selectable.map((item) => {
                                                return <SelectOption key={item[0]}
                                                    searchFilter={searchFilter}
                                                    item={item}
                                                    method={() => push(item[0])}
                                                />
                                            })}
                                        </div>
                                    )}
                                </FieldArray>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default MultiSelectFilter;