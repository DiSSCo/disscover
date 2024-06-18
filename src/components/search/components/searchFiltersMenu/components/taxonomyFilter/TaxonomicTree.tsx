/* Import Dependencies */
import classNames from 'classnames';
import { FieldArray } from 'formik';
import { isEmpty, merge } from 'lodash';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Utitlities */
import { SearchNestedObjectNode } from 'app/Utilities';
import { NextTaxonomyLevel, HarvestTaxonomicAggregations, RemoveBranchFromTree } from 'app/utilities/TaxonomicUtilities';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getAggregations } from 'redux-store/BootSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import GetDigitalSpecimenTaxonomyAggregations from 'api/digitalSpecimen/GetDigitalSpecimenTaxonomyAggregations';


/* Props Type */
type Props = {
    fieldValues: { [taxonomicLevel: string]: string[] },
    taxonomicRegistration: {
        [taxonomicLevel: string]: string[]
    },
    aggregations?: { [taxonomicLevel: string]: { [aggregation: string]: number } },
    SetTaxonomicRegistration: Function,
    OnSelect?: Function
};


const TaxonomicTree = (props: Props) => {
    const { fieldValues, taxonomicRegistration, aggregations, SetTaxonomicRegistration, OnSelect } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const bootAggregations = useAppSelector(getAggregations);
    let kingdoms: Dict = {};

    Object.keys(bootAggregations.kingdom).forEach(kingdom => {
        kingdoms[kingdom] = {};
    });

    const [taxonomicTreeData, setTaxonomicTreeData] = useState<Dict>({
        ...kingdoms
    });

    /* Iterate through the different taxonomic levels of aggregations to extract the taxonomic levels and their values */
    useEffect(() => {
        /* Fill in lacking species names from search params */
        // searchParams.getAll('species').forEach(species => {
        //     if (!(species in taxonomicRegistration)) {
        //         taxonomicRegistration.species[species] = 0;
        //     };
        // });

        // const taxonomicRequests = Object.entries(taxonomicRegistration).map(([taxonomicLevel, activeTaxonomies]) => {
        //     console.log(taxonomicLevel, activeTaxonomies);

        //     if (!isEmpty(activeTaxonomies)) {
        //         return new Promise<Dict>((resolve) => {
        //             /* Preprare empty requests array */
        //             const requests: { alias: string, params?: Dict, Method: Function }[] = [];

        //             /* Check if all values from taxonomic level are present in taxonomic tree, if not, add as request to the requests array */
        //             console.log(fieldValues);

        //             activeTaxonomies.map(key => {
        //                 if (fieldValues[taxonomicLevel].includes(key)) {
        //                     /* Push to requests */
        //                     requests.push({
        //                         alias: key,
        //                         params: {
        //                             searchFilters: {
        //                                 [taxonomicLevel]: [key]
        //                             }
        //                         },
        //                         Method: GetDigitalSpecimenTaxonomyAggregations
        //                     });
        //                 } else if (taxonomicLevel === 'kingdom') {
        //                     taxonomicTreeData[key] = {};
        //                 };
        //             });

        //             /* If there are new requests, fetch them from the API */
        //             if (!isEmpty(requests)) {
        //                 /* Build promises array to simultaneously fetch taxonomic aggregations */
        //                 const promises: Promise<{ [taxonomicLevel: string]: { [aggregation: string]: number } }>[] = [];

        //                 for (let index = 0; index < requests.length; index++) {
        //                     promises.push(GetDigitalSpecimenTaxonomyAggregations({
        //                         searchFilters: requests[index].params?.searchFilters
        //                     }));
        //                 };

        //                 /* Resolve promises and return taxonomic tree segments */
        //                 let taxonomicTreeSegments: Dict = {};

        //                 Promise.all(promises).then((results) => {
        //                     console.log(results);

        //                     /* Construct new taxonomic tree segments */
        //                     Promise.all(results.map(async (result) => {
        //                         console.log(result);

        //                         const harvestedTaxonomicAggregations = await HarvestTaxonomicAggregations(result);

        //                         console.log(harvestedTaxonomicAggregations);

        //                         taxonomicTreeSegments = { ...taxonomicTreeSegments, ...harvestedTaxonomicAggregations };
        //                     })).then(() => {
        //                         resolve(taxonomicTreeSegments);
        //                     }).catch(error => {
        //                         console.error(error);
        //                     });
        //                 }).catch(error => {
        //                     console.error(error);
        //                 }).finally(() => {
        //                     console.log(taxonomicRegistration);

        //                     SetTaxonomicRegistration({ ...taxonomicRegistration });
        //                 });
        //             } else {
        //                 resolve({});
        //             }
        //         });
        //     } else {
        //         return new Promise<undefined>((resolve) => {
        //             resolve(undefined);
        //         });
        //     }
        // });

        const taxonomicRequests = Object.entries(fieldValues).map(([taxonomicLevel, activeTaxonomies]) => {
            // if (!isEmpty(activeTaxonomies)) {
            return new Promise<Dict>((resolve) => {
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
                    // else if (taxonomicLevel === 'kingdom') {
                    //     taxonomicTreeData[key] = {};
                    // };
                });

                /* If there are new requests, fetch them from the API */
                if (!isEmpty(requests)) {
                    /* Build promises array to simultaneously fetch taxonomic aggregations */
                    const promises: Promise<{ [taxonomicLevel: string]: { [aggregation: string]: number } }>[] = [];

                    for (let index = 0; index < requests.length; index++) {
                        promises.push(GetDigitalSpecimenTaxonomyAggregations({
                            searchFilters: requests[index].params?.searchFilters
                        }));
                    };

                    /* Resolve promises and return taxonomic tree segments */
                    let taxonomicTreeSegments: Dict = {};

                    Promise.all(promises).then((results) => {
                        /* Construct new taxonomic tree segments */
                        Promise.all(results.map(async (result) => {
                            const harvestedTaxonomicAggregations = await HarvestTaxonomicAggregations(result);

                            taxonomicTreeSegments = { ...taxonomicTreeSegments, ...harvestedTaxonomicAggregations };
                        })).then(() => {
                            resolve(taxonomicTreeSegments);
                        }).catch(error => {
                            console.error(error);
                        });
                    }).catch(error => {
                        console.error(error);
                    }).finally(() => {
                        console.log(taxonomicRegistration);

                        SetTaxonomicRegistration({ ...taxonomicRegistration });
                    });
                } else {
                    /* Check for active taxonomic levels that are broken or deselected */
                    if (fieldValues[taxonomicLevel].length < taxonomicRegistration[taxonomicLevel].length) {
                        /* Search for the broken or deselected value */
                        const taxonomicValue: string | undefined = taxonomicRegistration[taxonomicLevel].find(taxonomicValue => !fieldValues[taxonomicLevel].includes(taxonomicValue));

                        if (taxonomicValue) {
                            (async () => {
                                /* Remove the complete branch of the broken or deselected taxonomic value */
                                const { taxonomicValuePurgeList } = await RemoveBranchFromTree(taxonomicTreeData, taxonomicLevel, taxonomicValue, taxonomicRegistration);

                                /* Remove from taxonomic registration */
                                const index: number = taxonomicRegistration[taxonomicLevel].findIndex(taxonomicValue => !fieldValues[taxonomicLevel].includes(taxonomicValue));

                                taxonomicRegistration[taxonomicLevel].splice(index, 1);

                                // SetTaxonomicRegistration({ ...taxonomicRegistration });

                                /* Remove from search params */
                                taxonomicValuePurgeList.map(purgeItem => {
                                    const taxonomicLevelValue: string[] = purgeItem.split('.', 1);
                            
                                    console.log(taxonomicLevelValue);
                            
                                    searchParams.delete(taxonomicLevelValue[0], taxonomicLevelValue[1]);

                                    setSearchParams(searchParams);
                                });
                            })();
                        };
                    };

                    resolve({});
                };
            });
            // } else {
            //     return new Promise<undefined>((resolve) => {
            //         resolve(undefined);
            //     });
            // }
        });

        Promise.all(taxonomicRequests).then((taxonomicTreeSegments: (Dict | undefined)[]) => {
            let taxonomicTree: Dict = {
                ...taxonomicTreeData
                // ...kingdoms
            };

            /* Add new taxonomic segments to taxonomic tree */
            taxonomicTreeSegments.map(segment => {
                if (!isEmpty(segment)) {
                    taxonomicTree = merge(taxonomicTree, segment);
                }
            });

            if (!isEmpty(taxonomicTree)) {
                setTaxonomicTreeData(taxonomicTree);
            };
        });
    }, [searchParams]);

    /**
     * Recursive function to built the taxanomic levels visually
     * @param taxonomicTreeSegment The current taxonomic level's options
     * @param taxonomicLevel The current taxonomic level
     * @returns HTML
     */
    const RenderTaxonomicLevels = (taxonomicTreeSegment: Dict, taxonomicLevel: string = 'kingdom') => {
        return (
            <div>
                <FieldArray name={`filters.taxonomy.${taxonomicLevel}`}>
                    {({ push, remove }) => (
                        <>
                            {Object.entries(taxonomicTreeSegment).map(([key, object]) => {
                                const fieldValuesIndex: number = fieldValues[taxonomicLevel].findIndex(fieldValue => fieldValue === key);

                                /* Class Names */
                                const taxonomicLevelValueClass = classNames({
                                    'tc-primary fw-bold': fieldValuesIndex >= 0
                                });

                                return (
                                    <Row key={key}>
                                        <Col>
                                            <button type="button"
                                                className={`${taxonomicLevelValueClass} button-no-style fs-5`}
                                                onClick={() => {
                                                    /* Check if index is present in field values, if not push to array, otherwise remove */
                                                    if (fieldValuesIndex >= 0) {
                                                        remove(fieldValuesIndex);
                                                    } else {
                                                        push(key);
                                                    };

                                                    OnSelect?.();
                                                }}
                                            >
                                                <p>{key}</p>
                                            </button>

                                            {!isEmpty(object) &&
                                                <div className="ms-1 ps-1 bl-primary">
                                                    {RenderTaxonomicLevels(object, NextTaxonomyLevel(taxonomicLevel))}
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                );
                            })}
                        </>
                    )}
                </FieldArray>
            </div>
        );
    };

    return (
        <div>
            {RenderTaxonomicLevels(taxonomicTreeData)}
        </div>
    );
};

export default TaxonomicTree;