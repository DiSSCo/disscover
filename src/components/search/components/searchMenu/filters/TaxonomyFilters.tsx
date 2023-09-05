/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchAggregations } from 'redux/search/SearchSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import MultiSelectFilter from './MultiSelectFilter';


/* Props Typing */
interface Props {
    selectedItems: Dict
    SetFieldValue: Function
};


const TaxonomyFilters = (props: Props) => {
    const { selectedItems, SetFieldValue } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const aggregations = useAppSelector(getSearchAggregations);
    const [filterToggle, setFilterToggle] = useState<boolean>(false);

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
                                <div className="b-primary rounded-full"
                                    onClick={() => setFilterToggle(!filterToggle)}
                                >
                                    <Row>
                                        <Col className="c-pointer">
                                            <div className="fs-4 c-greyDark rounded-full border-0 w-100 px-2 py-1">
                                                Select
                                            </div>
                                        </Col>
                                        <Col className="col-md-auto c-pointer pe-4">
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
                            </Col>
                        </Row>

                        {filterToggle &&
                            <div className="b-primary rounded-c mt-2">
                                {Object.keys(taxonomyFilters).map((taxonomy, index) => {
                                    let parentTaxonomy: string = '';

                                    if (taxonomy !== 'kingdom') {
                                        parentTaxonomy = Object.keys(taxonomyFilters)[index - 1];
                                    }

                                    return (
                                        <div key={taxonomy}>
                                            {(taxonomy === 'kingdom' || !isEmpty(selectedItems[parentTaxonomy])) &&
                                                <MultiSelectFilter key={taxonomy}
                                                    filter={taxonomyFilters[taxonomy]}
                                                    searchFilter={taxonomy}
                                                    items={aggregations[taxonomy]}
                                                    selectedItems={selectedItems[taxonomy]}
                                                />
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