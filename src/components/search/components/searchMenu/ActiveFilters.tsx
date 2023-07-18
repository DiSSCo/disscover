/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import ActiveFiltersTag from './ActiveFiltersTag';


const ActiveFilters = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const activeFilters: Dict = {};
    const activeFiltersRef = useRef(null);
    const [activeFiltersDropdownActive, setActiveFiltersDropdownActive] = useState(false);
    const [activeFiltersDropdownToggle, setActiveFiltersDropdownToggle] = useState(false);

    /* Extract active filters from Search Params */
    for (const searchParam of searchParams.entries()) {
        if (searchParam[0] !== 'q') {
            if (!activeFilters[searchParam[0]]) {
                activeFilters[searchParam[0]] = [searchParam[1]];
            } else {
                activeFilters[searchParam[0]].push(searchParam[1]);
            }
        }
    }

    /* Function for deactivating the Search Filter */
    const RemoveFilter = (filterKey: string, filterValue: string) => {
        /* Remove filter from active filters list */
        const newActiveFilters = activeFilters[filterKey].filter((filter: string) => filter !== filterValue);

        /* Remove all Search Params of filter key */
        searchParams.delete(filterKey);

        /* If filter key has leftovers, reappend to Search Params */
        newActiveFilters.forEach((filter: string) => {
            searchParams.append(filterKey, filter);
        });

        setSearchParams(searchParams);
    }

    /* OnChange of Search Params or view port width: check if dropdown menu is imminent due to length */
    const CheckActiveFiltersWidth = () => {
        if (activeFiltersRef.current) {
            /* If height of active filters is more than possibly visible, show dropdown */
            if (activeFiltersRef.current['clientHeight'] > 60) {
                setActiveFiltersDropdownActive(true);
            } else {
                setActiveFiltersDropdownActive(false);
                setActiveFiltersDropdownToggle(false);
            }
        }
    }

    useEffect(() => {
        CheckActiveFiltersWidth();
    }, [searchParams]);

    useEffect(() => {
        CheckActiveFiltersWidth();

        window.addEventListener("resize", CheckActiveFiltersWidth);

        return () => window.removeEventListener("resize", CheckActiveFiltersWidth)
    }, []);

    /* ClassName for Active Filters */
    const classActiveFilters = classNames({
        [`${styles.activeFilters}`]: true,
        [`${styles.active} ps-2`]: activeFiltersDropdownToggle
    });

    return (
        <Row className="h-100">
            <Col className="h-100 position-relative me-3">
                <div className={`${classActiveFilters} position-absolute w-100 pb-1`}>
                    <Row ref={activeFiltersRef}>
                        {/* Show dropdown button if active filters length exceeds available width */}
                        {activeFiltersDropdownActive &&
                            <Col className="col-md-auto pe-0">
                                <button type="button"
                                    className={`${styles.activeFilter} ${styles.activeFiltersDropdownButton} fw-lightBold px-2 py-1`}
                                    onClick={() => setActiveFiltersDropdownToggle(!activeFiltersDropdownToggle)}
                                >
                                    Show all filters

                                    {!activeFiltersDropdownToggle ?
                                        <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
                                        : <FontAwesomeIcon icon={faChevronUp} className="ms-1" />
                                    }
                                </button>
                            </Col>
                        }

                        {Object.keys(activeFilters).map((filterKey) => {
                            return (
                                <ActiveFiltersTag key={filterKey} filterKey={filterKey}
                                    filterValues={activeFilters[filterKey]}
                                    RemoveFilter={(filterValue: string) => RemoveFilter(filterKey, filterValue)}
                                />
                            );
                        })}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default ActiveFilters;