/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Field, FieldArray } from 'formik';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchAggregations, setSearchAggregations } from 'redux/search/SearchSlice';

/* Import Types */
import { SearchFilter, Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import SelectOption from './SelectOption';
import MidsOption from './MidsOption';

/* Import API */
import GetSpecimenSearchTermAggregations from 'api/specimen/GetSpecimenSearchTermAggregations';
import GetSpecimenAggregations from 'api/specimen/GetSpecimenAggregations';


/* Props Typing */
interface Props {
    filter: Dict,
    searchFilter: string,
    items: [],
    selectedItems: string[]
};

const MultiSelectFilter = (props: Props) => {
    const {
        filter,
        searchFilter,
        items,
        selectedItems
    } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base Variables */
    const [filteredItems, setFitleredItems] = useState<{ selected: [string, number][], selectable: [string, number][] }>({ selected: [], selectable: [] });
    const [filterToggle, setFilterToggle] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>();
    const aggregations = useAppSelector(getSearchAggregations);
    const searchFilters: SearchFilter[] = [];

    /* ForEach filter, push to Search Filters */
    for (const searchParam of searchParams.entries()) {
        searchFilters.push({
            [searchParam[0]]: searchParam[1]
        });
    }

    /* OnChange of Selected Items: Filter selectable Items*/
    useEffect(() => {
        const newFilteredItems: { selected: [string, number][], selectable: [string, number][] } = {
            selected: [],
            selectable: []
        };

        Object.entries(items).forEach((item: [string, number]) => {
            if (selectedItems.includes(item[0])) {
                newFilteredItems.selected.push(item);
            } else {
                newFilteredItems.selectable.push(item);
            }
        });

        setFitleredItems(newFilteredItems);
    }, [items, selectedItems]);

    /* OnChange of Search Query: refresh aggregations by query */
    useEffect(() => {
        const copyAggregations = { ...aggregations };

        /* Function to Refresh Aggregations */
        const RefreshAggregations = () => {
            GetSpecimenAggregations(searchFilters).then((aggregations) => {
                dispatch(setSearchAggregations(aggregations));
            }).catch(error => {
                console.warn(error);
            });
        }

        if (searchQuery) {
            /* Search for aggregations by search query */
            GetSpecimenSearchTermAggregations(searchFilter, searchQuery).then((filterAggregations) => {
                if (!isEmpty(filterAggregations[searchFilter])) {
                    /* Update aggregations of search filter */
                    copyAggregations[searchFilter] = filterAggregations[searchFilter];

                    /* If there are selected filters, make sure to include them */
                    selectedItems.forEach((selectedItem) => {
                        if (!copyAggregations[searchFilter][selectedItem]) {
                            copyAggregations[searchFilter][selectedItem] = aggregations[searchFilter][selectedItem]
                        }
                    });

                    dispatch(setSearchAggregations(copyAggregations));
                } else {
                    /* No hits, refert to the default, biggest aggregations */
                    RefreshAggregations();
                }
            }).catch(error => {
                console.warn(error);
            });
        } else if (searchQuery === '') {
            /* Reset to the default, biggest aggregations */
            RefreshAggregations();
        }
    }, [searchQuery]);

    /* OnChange of selected Items: Filter Specimens by */
    useEffect(() => {
        if (selectedItems.length !== searchParams.getAll(searchFilter).length) {
            setSearchParams(searchParams => {
                if (selectedItems.length < searchParams.getAll(searchFilter).length) {
                    searchParams.delete(searchFilter);
                }

                selectedItems.forEach((selectedItem) => {
                    if (!searchParams.getAll(searchFilter).includes(selectedItem)) {
                        searchParams.append(searchFilter, selectedItem);
                    }
                });

                return searchParams;
            });
        }
    }, [selectedItems]);

    /* ClassName for Filter Block */
    const classFilterBlock = classNames({
        "b-primary rounded-c": true,
        'd-none': !filterToggle,
        'd-block': filterToggle
    });

    if (filter.filterType === 'mids') {
        return (
            <Row className="mt-2 px-2">
                <Col>
                    <Row>
                        <Col>
                            <p className="fs-4 fw-bold"> {filter.displayName} </p>
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
            <Row className={`${filter.filterType !== 'taxonomy' && 'mt-2'} px-2`}>
                <Col>
                    {filter.filterType !== 'taxonomy' &&
                        <Row>
                            <Col>
                                <p className="fs-4 fw-bold"> {filter.displayName} </p>
                            </Col>
                        </Row>
                    }

                    <Row className="mt-1">
                        <Col>
                            {filter.filterType !== 'taxonomy' &&
                                /* Search bar for searching in optional Items */
                                <div className="b-primary rounded-full">
                                    <Row className="align-items-center">
                                        <Col>
                                            <Field name={`${searchFilter}Search`}
                                                className="fs-4 rounded-full border-0 w-100 px-2 py-1"
                                                placeholder="Select or type"
                                                onFocus={() => setFilterToggle(true)}
                                                onChange={(input: Dict) => setSearchQuery(input.target.value)}
                                            />
                                        </Col>

                                        <Col className="col-md-auto ps-0 pe-4">
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
                            }

                            {(filterToggle || filter.filterType === 'taxonomy') &&
                                <FieldArray name={`filters.${searchFilter}`}>
                                    {({ push, remove }) => (
                                        <div className={`${filter.filterType !== 'taxonomy' && classFilterBlock + ' mt-2'} px-2 py-1`}>
                                            {filter.filterType === 'taxonomy' &&
                                                /* Taxonomy Title */
                                                <p className="fs-5 c-greyDark"> {Capitalize(searchFilter)} </p>
                                            }

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