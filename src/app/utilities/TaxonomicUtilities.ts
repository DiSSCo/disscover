/* Import Dependencies */
import { isEmpty } from "lodash";

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
const NextTaxonomyLevel = (taxonomicLevel?: string) => {
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

    /* SetTaxonomicLevel helper functions */
    const SetPhylum = (taxonomicTree: Dict, values: string[]) => {
        if (values.length && taxonomicTreeLevels.kingdom !== 'Unknown kingdom') {
            values.forEach(phylum => {
                taxonomicTree[taxonomicHarvest.kingdom[0]][phylum] = {};
            });
        } else if (taxonomicTreeLevels.kingdom) {
            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0] ?? 'Unknown phylum'] = {};
            taxonomicTreeLevels.phylum = taxonomicHarvest.phylum[0] ?? 'Unknown phylum';
        };
    };

    const SetClass = (taxonomicTree: Dict, values: string[]) => {
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
    };

    const SetOrder = (taxonomicTree: Dict, values: string[]) => {
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
    };

    const SetFamily = (taxonomicTree: Dict, values: string[]) => {
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
    };

    const SetGenus = (taxonomicTree: Dict, values: string[]) => {
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
    };

    const SetSpecies = (taxonomicTree: Dict, values: string[]) => {
        if (values.length && taxonomicTreeLevels.genus !== 'Unknown genus') {
            values.forEach(species => {
                if (!taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][taxonomicHarvest.genus[0]][species]) {
                    taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicHarvest.phylum[0]][taxonomicHarvest.class[0]][taxonomicHarvest.order[0]][taxonomicHarvest.family[0]][taxonomicHarvest.genus[0]][species] = {};
                };
            });
        } else if (taxonomicTreeLevels.genus) {
            taxonomicTree[taxonomicHarvest.kingdom[0]][taxonomicTreeLevels.phylum][taxonomicTreeLevels.class][taxonomicTreeLevels.order][taxonomicTreeLevels.family][taxonomicTreeLevels.genus][taxonomicHarvest.species[0] ?? 'Unknown species'] = {};
            taxonomicTreeLevels.species = taxonomicHarvest.species[0] ?? 'Unknown species';
        };
    };

    /**
     * Function to set and populate a new branch in the taxonomic tree based upon the given taxonomic level and values
     * @param taxonomicLevel The current taxonomic level
     * @param values The values assigned to the current taxonomic level
     * @param taxonomicTree The current taxonomic tree to build further on
     */
    const SetTaxonomicLevel = (taxonomicLevel: string, values: string[], taxonomicTree: Dict) => {
        /* Switch to set the correct values to the taxonomic level, default is kingdom */
        switch (taxonomicLevel) {
            case 'phylum':
                SetPhylum(taxonomicTree, values);

                break;
            case 'class':
                SetClass(taxonomicTree, values);

                break;
            case 'order':
                SetOrder(taxonomicTree, values);

                break;
            case 'family':
                SetFamily(taxonomicTree, values);

                break;
            case 'genus':
                SetGenus(taxonomicTree, values);

                break;
            case 'species':
                SetSpecies(taxonomicTree, values);

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
        isEmpty(aggregations.kingdom) && (aggregations.kingdom['Unknown kingdom'] = 0);

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

/* RemoveBranchFromTaxonomicTree helper functions */
const RemovePhylum = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][taxonomicValue] = {};
};

const RemoveClass = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][taxonomicValue] = {};
};

const RemoveOrder = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][taxonomicValue] = {};
};

const RemoveFamily = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][taxonomicValue] = {};
};

const RemoveGenus = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][taxonomicValue] = {};
};

const RemoveSpecies = (taxonomicTree: Dict, branch: Dict, aggregations: Dict, taxonomicValue: string) => {
    branch = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][Object.keys(aggregations.genus)[0] ?? 'Unknown genus'][taxonomicValue];
    taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][Object.keys(aggregations.genus)[0] ?? 'Unknown genus'][taxonomicValue] = {};
};

/**
 * Function to remove a branch from the taxonomic tree based upon selected changes
 * @param baseTaxonomicTree The base taxonomic tree to work with
 * @param taxonomicLevel The current taxonomic level
 * @param taxonomicValue The value attached to the current taxonomic level
 * @param taxonomicRegistration The registration that keeps track of the selected taxonomic values
 * @returns Object containing the updated taxonomic tree and taxonomic registration, and a list of branches to be purged
 */
const RemoveBranchFromTaxonomicTree = async (baseTaxonomicTree: Dict, taxonomicLevel: string, taxonomicValue: string, taxonomicRegistration: Dict) => {
    /* Base variables */
    const taxonomicTree = { ...baseTaxonomicTree };
    let branch: Dict = {};

    /* Fech aggregations for given taxonomy level */
    const aggregations = await GetDigitalSpecimenTaxonomyAggregations({
        searchFilters: {
            [taxonomicLevel]: [taxonomicValue]
        }
    });

    /* Determine by taxonomic level, where to split the branch from the main tree */
    switch (taxonomicLevel) {
        case 'phylum':
            RemovePhylum(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        case 'class':
            RemoveClass(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        case 'order':
            RemoveOrder(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        case 'family':
            RemoveFamily(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        case 'genus':
            RemoveGenus(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        case 'species':
            RemoveSpecies(taxonomicTree, branch, aggregations, taxonomicValue);

            break;
        default:
            branch = taxonomicTree[taxonomicValue ?? 'Unknown kingdom'];
            taxonomicTree[taxonomicValue] = {};
    };

    /* Clean up loose ends in the taxonomic tree */
    TaxonomicCleanUp(taxonomicLevel, aggregations, taxonomicTree, taxonomicRegistration);

    /**
     * Recursive function to prepare a list of taxonomic values to be purged from the taxonomic tree
     * @param branch The branch to be purged
     * @param taxonomicLevel The current taxonomic level
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

    return {
        taxonomicTree,
        updatedTaxonomicRegistration: taxonomicRegistration,
        taxonomicValuePurgeList
    };
};

/**
 * Function to determine the previous (higher) level of taxonomy
 * @param taxonomicLevel The current taxonomic level
 * @returns String
 */
const PreviousTaxonomyLevel = (taxonomicLevel?: string): string => {
    switch (taxonomicLevel) {
        case 'species': return 'genus';
        case 'genus': return 'family';
        case 'family': return 'order';
        case 'order': return 'class';
        case 'class': return 'phylum';
        case 'phylum': return 'kingdom';
        case 'kingdom': return 'kingdom';
        default: return 'species';
    };
};

/* TaxonomicCleanUp helper functions */
const CleanUpSpecies = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'][Object.keys(aggregations.genus)[0] ?? 'Unknown genus'];
    taxonomicValue = Object.keys(aggregations.species)[0] ?? 'Unknown species';
};

const CleanUpGenus = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'][Object.keys(aggregations.family)[0] ?? 'Unknown family'];
    taxonomicValue = Object.keys(aggregations.genus)[0] ?? 'Unknown genus';
};

const CleanUpFamily = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'][Object.keys(aggregations.order)[0] ?? 'Unknown order'];
    taxonomicValue = Object.keys(aggregations.family)[0] ?? 'Unknown family';
};

const CleanUpOrder = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'][Object.keys(aggregations.class)[0] ?? 'Unknown class'];
    taxonomicValue = Object.keys(aggregations.order)[0] ?? 'Unknown order';
};

const CleanUpClass = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'][Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum'];
    taxonomicValue = Object.keys(aggregations.class)[0] ?? 'Unknown class';
};

const CleanUpPhylum = (taxonomicTree: Dict, path: Dict, aggregations: Dict, taxonomicValue: string) => {
    path = taxonomicTree[Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom'];
    taxonomicValue = Object.keys(aggregations.phylum)[0] ?? 'Unknown phylum';
};

/**
 * Function to check if there are obsolete or unknown taxonomic values with no children, these can be removed to clean up the taxonomic tree
 * @param taxonomicLevel The current taxonomic level
 * @param aggregations The aggregations fetched for the taxonomic level
 * @param taxonomicTree The taxonomic tree to clean up
 * @param taxonomicRegistration The reguistration that keeps track of the selected taxonomic values
 */
const TaxonomicCleanUp = (taxonomicLevel: string, aggregations: { [taxonomicLevel: string]: { [aggregation: string]: number } }, taxonomicTree: Dict, taxonomicRegistration: Dict) => {
    /* Harvest the path (segment of taxonomic tree) that adheres to the given taxonomic level and determine the taxonomic value */
    if (taxonomicLevel in aggregations && !taxonomicRegistration[taxonomicLevel].find((taxonomicValue: string) => Object.keys(aggregations[taxonomicLevel]).includes(taxonomicValue))) {
        let path: Dict = {};
        let taxonomicValue: string = '';

        switch (taxonomicLevel) {
            case 'species':
                CleanUpSpecies(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            case 'genus':
                CleanUpGenus(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            case 'family':
                CleanUpFamily(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            case 'order':
                CleanUpOrder(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            case 'class':
                CleanUpClass(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            case 'phylum':
                CleanUpPhylum(taxonomicTree, path, aggregations, taxonomicValue);

                break;
            default:
                path = taxonomicTree;
                taxonomicValue = Object.keys(aggregations.kingdom)[0] ?? 'Unknown kingdom';
        };

        if (path[taxonomicValue] && !taxonomicRegistration[taxonomicLevel].includes(taxonomicValue)) {
            path[taxonomicValue] = {};
        };

        /* If there are more parent taxonomy levels, continue by recursively calling this function again for the previous taxonomy level */
        if (taxonomicLevel !== 'kingdom') {
            taxonomicTree = TaxonomicCleanUp(PreviousTaxonomyLevel(taxonomicLevel), aggregations, taxonomicTree, taxonomicRegistration);
        } else if (isEmpty(taxonomicTree['Unknown kingdom'])) {
            /* At the end always check if unknown kingdom is empty, if so remove */
            delete taxonomicTree['Unknown kingdom'];
        };
    };

    return taxonomicTree;
};

export {
    NextTaxonomyLevel,
    HarvestTaxonomicAggregations,
    GetTaxonomicLevels,
    RemoveBranchFromTaxonomicTree
};