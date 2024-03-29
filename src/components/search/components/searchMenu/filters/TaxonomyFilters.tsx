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
import { InputListSelectItem, Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import MultiSelectFilter from './MultiSelectFilter';
import InputSelectList from 'components/general/selects/InputListSelect';

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

    /* Format species results for Input List Select Component */
    let inputListSelectItems: InputListSelectItem[] = [];

    if (speciesResults) {
        Object.entries(speciesResults).forEach(([value]) => {
            inputListSelectItems.push({
                name: value
            });
        });
    }

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

    /* Function to search Aggregations by a taxonomy level query, retuning relevant scientific names */
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


    /* Function to search for Specimens on Species level  */
    const SearchBySpecies = (species?: string) => {
        setSearchParams(searchParams => {
            if (species) {
                searchParams.set('species', species);
            } else {
                searchParams.delete('species');
            }

            return searchParams;
        });
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
                                                autocomplete="off"
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
                                    <InputSelectList items={inputListSelectItems}
                                        OnItemSelect={(species: string) => SearchBySpecies(species)}
                                        OnClose={() => setSpeciesResults(undefined)}
                                    />
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