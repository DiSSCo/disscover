/* Import Dependencies */
import { useSearchParams } from 'react-router-dom';
import { Capitalize } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


const ActiveFilters = () => {
    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const activeFilters: Dict = {};

    /* Extract active filters from Search Params */
    for (const searchParam of searchParams.entries()) {
        if (!activeFilters[searchParam[0]]) {
            activeFilters[searchParam[0]] = [searchParam[1]];
        } else {
            activeFilters[searchParam[0]].push(searchParam[1]);
        }
    }

    /* Function for deactivating the Search Filter */
    const RemoveFilter = (filterKey: string, filterValue: string) => {
        /* Remove filter from active filters list */
        const newActiveFilters = activeFilters[filterKey].filter((filter: string) => filter !== filterValue);

        /* Remove all Search Params of filter key */
        searchParams.delete(filterKey);

        // /* If filter key has leftovers, reappend to Search Params */
        newActiveFilters.forEach((filter: string) => {
            searchParams.append(filterKey, filter);
        });

        setSearchParams(searchParams);
    }

    return (
        <Row>
            <Col>
                <div>
                    <Row>
                        {Object.keys(activeFilters).map((filterKey) => {
                            return (
                                activeFilters[filterKey].map((filter: string) => {

                                    return (
                                        <Col key={filter} className="col-md-auto pe-0">
                                            <div className={`${styles.activeFilter} fw-lightBold px-2 py-1`}>
                                                <FontAwesomeIcon icon={faCircleXmark} className={`${styles.activeFilterIcon} pe-1 c-primary`}
                                                    onClick={() => RemoveFilter(filterKey, filter)}
                                                />

                                                {`${Capitalize(filterKey)}: ${filter}`}
                                            </div>
                                        </Col>
                                    );
                                })
                            );
                        })}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default ActiveFilters;