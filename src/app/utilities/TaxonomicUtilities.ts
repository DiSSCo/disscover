/* Import Dependencies */
import { isEmpty } from "lodash";
import { useSearchParams } from "react-router-dom";

/* Import Types */
import { Dict } from "app/Types";

/* Import API */
import GetDigitalSpecimenTaxonomyAggregations from "api/digitalSpecimen/GetDigitalSpecimenTaxonomyAggregations";


/* Utilities associated with taxonomy */

/**
 * Function to determine the next (deeper) level of taxonomy
 * @param taxonomicLevel The current taxonomic level
 * @returns String
 */
const NextTaxonomyLevel = (taxonomicLevel: string) => {
    switch (taxonomicLevel) {
        case 'kingdom': return 'phylum';
        case 'phylum': return 'class';
        case 'class': return 'order';
        case 'order': return 'family';
        case 'family': return 'genus';
        case 'genus': return 'species';
        case 'species': return 'species'
        default: return 'kingdom';
    };
};

/**
 * Function to harvest the different levels of taxonomy from a taxonomic aggregations object
 * @param taxonomicAggregations The taxonomic aggregations object as received from the API
 * @returns Object with taxonomic levels as keys and arrays with the harvested values as strings
 */
const HarvestTaxonomicAggregations = async (taxonomicAggregations: { [taxonomicLevel: string]: { [aggregation: string]: number } }) => {
    /* Craft harvest object */
    const taxonomicHarvest: { [taxonomicLevel: string]: string[] } = {
        kingdom: [],
        phylum: [],
        class: [],
        order: [],
        family: [],
        genus: [],
        species: []
    };

    Object.entries(taxonomicAggregations).forEach(([taxonomicLevel, aggregations]) => {
        taxonomicHarvest[taxonomicLevel] = [...Object.keys(aggregations).map(key => key)];
    });

    /* Function to set taxonomic levels according to their parent levels */
    let taxonomicTree: Dict = {};
    const taxonomicTreeLevels: { [taxonomicLevel: string]: string } = {
        kingdom: taxonomicHarvest.kingdom[0]
    };

    const SetTaxonomicLevel = (taxonomicLevel: string, values: string[], taxonomicTree: Dict) => {
        /* Switch to set the correct values to the taxonomic level, default is kingdom */
        switch (taxonomicLevel) {
            case 'phylum':
                if (values.length && taxonomicTreeLevels.kingdom !== 'Unknown kingdom') {
                    values.forEach(phylum => {
                        taxonomicTree[taxonomicHarvest.kingdom[0]][phylum] = {};
                    });
                } else if (taxonomicTreeLevels.kingdom) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0] ?? 'Unknown phylum'] = {};
                    taxonomicTreeLevels.phylum = taxonomicHarvest.phylum[0] ?? 'Unknown phylum';
                };

                break;
            case 'class':
                if (values.length && taxonomicTreeLevels.phylum !== 'Unknown phylum') {
                    values.forEach(taxonomicClass => {
                        if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicClass]) {
                            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicClass] = {};
                        };
                    });
                } else if (taxonomicTreeLevels.phylum) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicHarvest.class[0] ?? 'Unknown class'] = {};
                    taxonomicTreeLevels.class = taxonomicHarvest.class[0] ?? 'Unknown class';
                };

                break;
            case 'order':
                if (values.length && taxonomicTreeLevels.class !== 'Unknown class') {
                    values.forEach(order => {
                        if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][order]) {
                            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][order] = {};
                        };
                    });
                } else if (taxonomicTreeLevels.class) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicTreeLevels.class][taxonomicHarvest.order[0] ?? 'Unknown order'] = {};
                    taxonomicTreeLevels.order = taxonomicHarvest.order[0] ?? 'Unknown order';
                }

                break;
            case 'family':
                if (values.length && taxonomicTreeLevels.order !== 'Unknown order') {
                    values.forEach(family => {
                        if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][family]) {
                            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][family] = {};
                        };
                    });
                } else if (taxonomicTreeLevels.order) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicTreeLevels.class][taxonomicTreeLevels.order][taxonomicHarvest.family[0] ?? 'Unknown family'] = {};
                    taxonomicTreeLevels.family = taxonomicHarvest.family[0] ?? 'Unknown family';
                }

                break;
            case 'genus':
                if (values.length && taxonomicTreeLevels.family !== 'Unknown family') {
                    values.forEach(genus => {
                        if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][genus]) {
                            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][genus] = {};
                        };
                    });
                } else if (taxonomicTreeLevels.family) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicTreeLevels.class][taxonomicTreeLevels.order][taxonomicTreeLevels.family][taxonomicHarvest.genus[0] ?? 'Unknown genus'] = {};
                    taxonomicTreeLevels.genus = taxonomicHarvest.genus[0] ?? 'Unknown genus';
                }

                break;
            case 'species':
                if (values.length && taxonomicTreeLevels.genus !== 'Unknown genus') {
                    values.forEach(species => {
                        if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][taxonomicHarvest.genus[0]][species]) {
                            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][taxonomicHarvest.genus[0]][species] = {};
                        };
                    });
                } else if (taxonomicTreeLevels.genus) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicTreeLevels.class][taxonomicTreeLevels.order][taxonomicTreeLevels.family][taxonomicTreeLevels.genus][taxonomicHarvest.species[0] ?? 'Unknown species'] = {};
                    taxonomicTreeLevels.species = taxonomicHarvest.species[0] ?? 'Unknown species';
                }

                break;
            default:
                taxonomicTree[taxonomicHarvest.kingdom[0]] = { ...taxonomicTree[taxonomicHarvest.kingdom[0]] }

                break;
        };
    };

    /* Check if kingdom is present, otherwise check for other, most upper taxonomic level */
    if (!isEmpty(taxonomicHarvest.kingdom)) {
        Object.entries(taxonomicHarvest).forEach(([taxonomicLevel, values]) => {
            SetTaxonomicLevel(taxonomicLevel, values, taxonomicTree);
        });
    } else if (Object.entries(taxonomicHarvest).filter(([taxonomicLevel, harvestArray]) => harvestArray.length && taxonomicLevel !== 'species').length > 0) {
        /* Find taxonomic aggregations of next highest level */
        let level: string = 'phylum';
        let taxonomicValue: string | undefined;

        while (!taxonomicValue) {
            if (!isEmpty(taxonomicHarvest[level])) {
                taxonomicValue = taxonomicHarvest[level][0];
            } else {
                level = NextTaxonomyLevel(level);
            };
        };

        /* Try to fetch full taxonomy untill next highest level */
        const aggregations = await GetDigitalSpecimenTaxonomyAggregations({
            searchFilters: {
                [level]: [taxonomicValue],
                ...(taxonomicHarvest.species.length && { species: taxonomicHarvest.species })
            }
        });

        /* If kingdom is still undefined and the additional call thus has not helped to determine the full taxonomy, continue as unknown */
        if (isEmpty(aggregations.kingdom)) {
            aggregations.kingdom['Unknown kingdom'] = 0;
        };

        /* Recall this function with new taxonomic harvest */
        taxonomicTree = HarvestTaxonomicAggregations(aggregations);
    } else if (taxonomicHarvest['species'].length) {
        taxonomicAggregations.kingdom['Unknown kingdom'] = 0;

        taxonomicTree = HarvestTaxonomicAggregations(taxonomicAggregations);
    };

    return taxonomicTree;
};

/**
 * Function to get the order of taxonomy as an array of strings
 * @returns Array of strings
 */
const GetTaxonomicLevels = () => {
    return [
        'kingdom',
        'phylum',
        'class',
        'order',
        'family',
        'genus',
        'species'
    ];
};

const RemoveBranchFromTree = async (taxonomicTree: Dict, taxonomicLevel: string, taxonomicValue: string, taxonomicRegistration: Dict) => {
    /* Base variables */
    let branch: Dict = {};

    /* Get taxonomic aggregations, if taxonomic level is not kingdom */
    if (taxonomicLevel === 'kingdom') {
        taxonomicTree[taxonomicValue] = {};
    };

    /* Fech aggregations for given taxonomy level */
    const aggregations = await GetDigitalSpecimenTaxonomyAggregations({
        searchFilters: {
            [taxonomicLevel]: [taxonomicValue]
        }
    });

    console.log(aggregations);
    console.log(taxonomicTree);

    /* Determine by taxonomic level, where to split the branch from the main tree */
    switch (taxonomicLevel) {
        case 'phylum':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][taxonomicValue] = {};

            break;
        case 'class':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][taxonomicValue] = {};

            break;
        case 'order':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][taxonomicValue] = {};

            break;
        case 'family':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][taxonomicValue] = {};

            break;
        case 'genus':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][taxonomicValue] = {};

            break;
        case 'species':
            branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][Object.keys(aggregations.genus)[0] ?? 'Unknown genus'][taxonomicValue];
            taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][Object.keys(aggregations.genus)[0] ?? 'Unknown genus'][taxonomicValue] = {};
    };

    /**
     * 
     * @param branch 
     * @param taxonomicLevel 
     */
    const PurgeBranch = (branch: Dict, taxonomicLevel: string) => {
        Object.entries(branch).map(([taxonomicValue, childBranch]) => {
            /* Remove from taxonomic registration */
            const index: number = taxonomicRegistration[taxonomicLevel].findIndex((value: string) => value === taxonomicValue);

            taxonomicRegistration[taxonomicLevel].splice(index, 1);

            /* Add to taxonomic value purge list */
            taxonomicValuePurgeList.push(`${taxonomicLevel}.${taxonomicValue}`);

            if (!isEmpty(childBranch)) {
                PurgeBranch(childBranch, NextTaxonomyLevel(taxonomicLevel));
            };
        });
    };

    /* For all child taxonomies of branch, remove them from the taxonomic registration and prepare purge list for deletion of search params */
    const taxonomicValuePurgeList: string[] = [];

    PurgeBranch(branch, NextTaxonomyLevel(taxonomicLevel));

    /* Remove from search params */
    console.log(taxonomicValuePurgeList);

    return {
        taxonomicTree,
        taxonomicValuePurgeList
    };

    // if (baseTaxonomicLevel)
};

export {
    NextTaxonomyLevel,
    HarvestTaxonomicAggregations,
    GetTaxonomicLevels,
    RemoveBranchFromTree
};