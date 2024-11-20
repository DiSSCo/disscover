/* Import Dependencies */
import { isEmpty, merge } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/* Import Utitlities */
import { HarvestTaxonomicAggregations, RemoveBranchFromTaxonomicTree } from 'app/utilities/TaxonomicUtilities';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAggregations } from 'redux-store/BootSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import GetDigitalSpecimenTaxonomyAggregations from 'api/digitalSpecimen/GetDigitalSpecimenTaxonomyAggregations';

/* Import Components */
import TaxonomicLevel from './TaxonomicLevel';


/* Props Type */
type Props = {
    fieldValues: { [taxonomicLevel: string]: string[] },
    taxonomicRegistration: {
        [taxonomicLevel: string]: string[]
    },
    formValues: Dict,
    SetTaxonomicRegistration: Function,
    SetFormValues: Function,
    OnSelect?: Function
};


/**
 * Component that renders the taxonomic tree when using the taxonomic filter
 * @param fieldValues The current values of all the taxonomical filters in the search filter in the form
 * @param taxonomicRegistration The registration that looks after which taxonomies have been selected and rendered
 * @param formValues All of the current form values
 * @param SetTaxonomicRegistration A function to set and update the taxonomic registration
 * @param SetFormValue A function to set and update all of the form values
 * @param OnSelect A function that is called when a taxonomic option has been selected
 * @returns JSX Component
 */
const TaxonomicTree = (props: Props) => {
    const { fieldValues, taxonomicRegistration, formValues, SetTaxonomicRegistration, SetFormValues, OnSelect } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const bootAggregations = useAppSelector(getAggregations);

    /* Distill the kingdoms from the boot aggregations, these will function as the base of the taxonomic tree */
    let kingdoms: Dict = {};

    Object.keys(bootAggregations.kingdom).forEach(kingdom => {
        kingdoms[kingdom] = {};
    });

    /* The variable that will hold the taxonomic tree in full */
    const [taxonomicTreeData, setTaxonomicTreeData] = useState<Dict>({
        ...kingdoms
    });

    const GeneratePromise = (taxonomicLevel: string, activeTaxonomies: string[], Resolve: Function) => {
        /* Preprare empty requests array */
        const requests: { alias: string, params?: Dict, Method: Function }[] = [];

        /* Check if all values from taxonomic level are present in taxonomic registration, if not, add as request to the requests array */
        activeTaxonomies.map(key => {
            if (!taxonomicRegistration[taxonomicLevel].includes(key)) {
                /* Push to requests */
                requests.push({
                    alias: key,
                    params: {
                        searchFilters: {
                            [taxonomicLevel]: [key]
                        }
                    },
                    Method: GetDigitalSpecimenTaxonomyAggregations
                });

                /* Push to taxonomic registration */
                taxonomicRegistration[taxonomicLevel].push(key);
            };
        });

        /* If there are new requests, fetch them from the API */
        if (!isEmpty(requests)) {
            /* Build promises array to simultaneously fetch taxonomic aggregations */
            const promises: Promise<{ [taxonomicLevel: string]: { [aggregation: string]: number } }>[] = [];

            requests.map(request => {
                promises.push(GetDigitalSpecimenTaxonomyAggregations({
                    searchFilters: request.params?.searchFilters
                }));
            });

            /* Resolve promises and return taxonomic tree segments */
            let taxonomicTreeSegments: Dict = {};

            Promise.all(promises).then((results) => {
                /* Construct new taxonomic tree segments */
                Promise.all(results.map(async (result) => {
                    const harvestedTaxonomicAggregations = await HarvestTaxonomicAggregations(result);

                    taxonomicTreeSegments = { ...taxonomicTreeSegments, ...harvestedTaxonomicAggregations };
                })).then(() => {
                    Resolve(taxonomicTreeSegments);
                }).catch(error => {
                    console.error(error);
                });
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                SetTaxonomicRegistration({ ...taxonomicRegistration });
            });
        } else {
            /* Check for active taxonomic levels that are broken or deselected */
            if (fieldValues[taxonomicLevel].length < taxonomicRegistration[taxonomicLevel].length) {
                /* Search for the broken or deselected value */
                const taxonomicValue: string | undefined = taxonomicRegistration[taxonomicLevel].find(taxonomicValue => !fieldValues[taxonomicLevel].includes(taxonomicValue));

                const FindFieldIndex = (newformValues: Dict, taxonomicLevelValue: string[]) => {
                    return newformValues.filters.taxonomy[taxonomicLevelValue[0]].findIndex((value: string) => value === taxonomicLevelValue[1]);
                };

                if (taxonomicValue) {
                    (async () => {
                        /* Remove from taxonomic registration */
                        const index: number = taxonomicRegistration[taxonomicLevel].findIndex(taxonomicValue => !fieldValues[taxonomicLevel].includes(taxonomicValue));

                        taxonomicRegistration[taxonomicLevel].splice(index, 1);

                        /* Remove the complete branch of the broken or deselected taxonomic value */
                        const { taxonomicTree, taxonomicValuePurgeList } = await RemoveBranchFromTaxonomicTree(
                            taxonomicTreeData, taxonomicLevel, taxonomicValue, taxonomicRegistration
                        );

                        /* Remove from search params */
                        const newformValues = { ...formValues }; 

                        taxonomicValuePurgeList.map(purgeItem => {
                            /* Split item into array consisting of [field, value] */
                            const taxonomicLevelValue: string[] = purgeItem.replace('.', '&').split('&', 2);

                            /* Try to find index of field value in original form values and remove */
                            const index: number = FindFieldIndex(newformValues, taxonomicLevelValue);
                            newformValues.filters.taxonomy[taxonomicLevelValue[0]].splice(index, 1);

                            /* Prepare to delete field value from search params */
                            searchParams.delete(taxonomicLevelValue[0], taxonomicLevelValue[1]);
                        });

                        /* Undo taxonomic search */
                        newformValues.search.taxonomy = '';

                        /* Set updated data to form values, search params and taxonomic tree data */
                        SetTaxonomicRegistration({ ...taxonomicRegistration });
                        SetFormValues(newformValues);
                        setSearchParams(searchParams);
                        setTaxonomicTreeData(taxonomicTree);
                    })();
                };
            };

            Resolve({});
        };
    };

    /* Iterate through the different taxonomic levels of aggregations to extract the taxonomic levels and their values */
    useEffect(() => {
        const taxonomicRequests = Object.entries(fieldValues).map(([taxonomicLevel, activeTaxonomies]) => {
            return new Promise<Dict>((resolve) => {
                GeneratePromise(taxonomicLevel, activeTaxonomies, resolve);
            });
        });

        /* Based upon the results retrieved from the requests, build the complete taxonomic tree */
        Promise.all(taxonomicRequests).then((taxonomicTreeSegments: (Dict | undefined)[]) => {
            let taxonomicTree: Dict = {
                ...taxonomicTreeData
            };

            /* Add new taxonomic segments to taxonomic tree */
            taxonomicTreeSegments.map(segment => {
                if (!isEmpty(segment)) {
                    taxonomicTree = merge(taxonomicTree, segment);
                }
            });

            if (!isEmpty(taxonomicTree)) {
                setTaxonomicTreeData(taxonomicTree);
            }
        });
    }, [searchParams]);

    /**
     * Recursive function to build the taxanomic levels visually
     * @param taxonomicTreeSegment A branch segment to be merged into the taxonomic tree
     * @param taxonomicLevel The current taxonomic level
     * @returns JSX Component, representing the taxonomic tree
     */
    const RenderTaxonomicLevels = (taxonomicTreeSegment: Dict, taxonomicLevel: string = 'kingdom') => {
        return <TaxonomicLevel taxonomicLevel={taxonomicLevel}
            taxonomicTreeSegment={taxonomicTreeSegment}
            fieldValues={fieldValues}
            OnSelect={OnSelect}
            RenderTaxonomicLevels={RenderTaxonomicLevels}
        />
    };

    return (
        <div>
            {RenderTaxonomicLevels(taxonomicTreeData)}
        </div>
    );
};

export default TaxonomicTree;