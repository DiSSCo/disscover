/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchAggregations } from 'redux/search/SearchSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import MultiSelectFilter from './MultiSelectFilter';

/* Import API */
import SearchSpecimenSearchTermValue from 'api/specimen/SearchSpecimenSpeciesName';


/* Props Typing */
interface Props {
    selectedItems: Dict
    SetFieldValue: Function,
    RefreshAggregations: Function
};


const TaxonomyFilters = (props: Props) => {
    const { selectedItems, SetFieldValue, RefreshAggregations } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const aggregations = useAppSelector(getSearchAggregations);
    const [filterToggle, setFilterToggle] = useState<boolean>(false);
    const [speciesResults, setSpeciesResults] = useState<Dict | undefined>();

    /* Taxonomy filters, listed by hierarchical order */
    const taxonomyFilters: Dict = {
        kingdom: {
            displayName: 'Kingdom',
            filterType: 'taxonomy'
        },
        phylum: {
            displayName: 'Phylum',
            filterType: 'taxonomy'
        },
        class: {
            displayName: 'Class',
            filterType: 'taxonomy'
        },
        order: {
            displayName: 'Order',
            filterType: 'taxonomy'
        },
        family: {
            displayName: 'Family',
            filterType: 'taxonomy'
        },
        genus: {
            displayName: 'Genus',
            filterType: 'taxonomy'
        }
    };

    /* OnChange of selected items: check if parent taxon is empty, if so, remove child filters */
    useEffect(() => {
        let emptyTaxonomy: string = '';
        let index = 0;

        while (!emptyTaxonomy && index !== Object.keys(taxonomyFilters).length) {
            const taxonomy = Object.keys(taxonomyFilters)[index];

            if (isEmpty(selectedItems[taxonomy])) {
                emptyTaxonomy = taxonomy;
            }

            index++;
        }

        if (emptyTaxonomy) {
            /* Make sure all child taxonomies from the chosen one, are empty */
            Object.keys(taxonomyFilters).slice(index).forEach((taxonomy) => {
                /* Remove from Search Params */
                searchParams.delete(taxonomy);

                SetFieldValue(taxonomy, []);
            });

            setSearchParams(searchParams);
        }
    }, [aggregations]);

    /* Function to search by a taxonomy level query, retuning relevant scientific names */
    const SearchByTaxonomicQuery = (query: string) => {
        if (query) {
            SearchSpecimenSearchTermValue('species', query).then((results: Dict) => {
                setSpeciesResults(results);
            }).catch(error => {
                console.warn(error);
            });
        } else {
            setSpeciesResults(undefined);
        }
    }

    /* Function to toggle Taxonomy Filter */
    const ToggleTaxonomyFilter = (toggle?: boolean) => {
        if (filterToggle) {
            setSpeciesResults(undefined);
        }

        setFilterToggle(toggle ?? !filterToggle);
    }

    return (
        <Row className="mt-2 px-2">
            <Col>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <p className="fs-4 fw-bold"> Taxonomy </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="b-primary rounded-full position-relative">
                                    <Row>
                                        <Col className="c-pointer">
                                            <Field name={`scientificName`}
                                                className="fs-4 rounded-full border-0 w-100 px-2 py-1"
                                                placeholder="Select or type"
                                                onFocus={() => ToggleTaxonomyFilter(true)}
                                                onChange={(input: Dict) => SearchByTaxonomicQuery(input.target.value)}
                                            />
                                        </Col>
                                        <Col className="col-md-auto c-pointer pe-4">
                                            {filterToggle ?
                                                <FontAwesomeIcon icon={faChevronUp}
                                                    className="c-primary c-pointer"
                                                    onClick={() => ToggleTaxonomyFilter(false)}
                                                />
                                                : <FontAwesomeIcon icon={faChevronDown}
                                                    className="c-primary c-pointer"
                                                    onClick={() => ToggleTaxonomyFilter(true)}
                                                />
                                            }
                                        </Col>
                                    </Row>


                                    {/* If present, display Species Search Results */}
                                    {(speciesResults && filterToggle) &&
                                        <div className="position-absolute w-100 mt-2">
                                            {Object.entries(speciesResults).map(([scientificName, number]) => (
                                                <Row>
                                                    <Col>
                                                        <div className={`${styles.filterSpeciesOption} transition bgc-white px-3 py-2 b-grey`}>
                                                            <p className="fs-4"> {scientificName} </p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
 
                        {filterToggle &&
                            <div className="b-primary rounded-c mt-2">
                                {Object.keys(taxonomyFilters).map((taxonomyLevel, index) => {
                                    let parentTaxonomy: string = '';

                                    if (taxonomyLevel !== 'kingdom') {
                                        parentTaxonomy = Object.keys(taxonomyFilters)[index - 1];
                                    }

                                    return (
                                        <div key={taxonomyLevel}>
                                            {(taxonomyLevel === 'kingdom' || (taxonomyLevel in aggregations && selectedItems[parentTaxonomy].length)) ?
                                                <MultiSelectFilter filter={taxonomyFilters[taxonomyLevel]}
                                                    searchFilter={taxonomyLevel}
                                                    items={aggregations[taxonomyLevel]}
                                                    selectedItems={selectedItems[taxonomyLevel] ?? []}
                                                    RefreshAggregations={() => RefreshAggregations()}
                                                />
                                                : null
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TaxonomyFilters;