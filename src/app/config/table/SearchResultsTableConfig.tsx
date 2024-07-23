/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { Dict } from 'app/Types';


/**
 * Config function that sets up the basic table column template for the search results table on the search page
 * @returns Table columns
 */
const SearchResultsTableConfig = () => {
    /* Type interface */
    type SearchResult = {
        selected: boolean,
        DOI: string,
        taxonomyIconUrl: Promise<string | Dict>,
        specimenName: string,
        physicalSpecimenID: string,
        topicDiscipline: string,
        countryOfOrigin: string,
        dateCollected: string,
        organisation: [string, string]
    };

    /* Base variables */
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const columnHelper = createColumnHelper<SearchResult>();

    /**
     * 
     */
    const TaxonomyIconCell = (promise: Promise<Dict | string>) => {
        /* Base variables */
        const [taxonomyIcon, setTaxonomyIcon] = useState<string | undefined>();

        Promise.resolve(promise).then(value => {
            setTaxonomyIcon(typeof value == 'object' ? value.default : value);
        });

        return (
            <img src={taxonomyIcon}
                alt={taxonomyIcon}
                className="b-none"
                style={{ width: `${taxonomyIcon && 2.5 * 0.85}rem`, height: `${taxonomyIcon && 2.5 * 0.85}rem` }}
            />
        );
    };

    /* Table columns */
    const columns = [
        ...(compareDigitalSpecimen ? [columnHelper.accessor('selected', {
            header: '',
            cell: info => <input type="checkbox" defaultChecked={info.getValue()} />,
            meta: {
                widthInRem: 3,
                pinned: true
            }
        })] : []),
        columnHelper.accessor('taxonomyIconUrl', {
            header: '',
            cell: info => TaxonomyIconCell(info.getValue()),
            meta: {
                widthInRem: 4,
                pinned: true
            }
        }),
        columnHelper.accessor('DOI', {
            cell: info => info.getValue()?.replace(import.meta.env.VITE_DOI_URL as string, ''),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('specimenName', {
            header: 'Specimen Name',
            meta: {
                widthInRem: 14,
                pinned: true
            }
        }),
        columnHelper.accessor('physicalSpecimenID', {
            header: 'Physical Specimen ID',
            meta: {
                widthInRem: 14
            }
        }),
        columnHelper.accessor('topicDiscipline', {
            header: 'Topic Discipline',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('countryOfOrigin', {
            header: 'Country of Origin',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('dateCollected', {
            header: 'Date Collected',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('organisation', {
            header: 'Organisation',
            cell: info => <a href={info.getValue()[1]}
                target="_blank" rel="noreferer"
                className="c-accent h-underline"
            >
                {info.getValue()?.[0]}
            </a>,
            meta: {
                widthInRem: 12,
                link: true,
                sortable: true
            }
        })
    ];

    return { columns };
};

export default SearchResultsTableConfig;