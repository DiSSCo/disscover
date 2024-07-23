/* Import Dependencies */
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/* Import Utilities */
import { DetermineTopicDisciplineIcon } from 'app/utilities/NomenclaturalUtilities';

/* Import Config */
import SearchResultsTableConfig from 'app/config/table/SearchResultsTableConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { getPhylopicBuild } from 'redux-store/BootSlice';
import { getSearchDigitalSpecimen, setSearchDigitalSpecimen, getCompareDigitalSpecimen, setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { PaginationObject, Dict } from 'app/Types';

/* Import API */
import GetPhylopicIcon from 'api/phylopic/GetPhylopicIcon';

/* Import Components */
import { Paginator } from 'components/elements/Elements';
import { DataTable, LoadingScreen } from 'components/elements/customUI/CustomUI';


/* Data table row type */
type DataRow = {
    index: number,
    DOI: string,
    taxonomyIconUrl: Promise<string | Dict | undefined>,
    specimenName: string | undefined,
    physicalSpecimenID: string | undefined,
    topicDiscipline: string | undefined,
    countryOfOrigin: string | undefined,
    dateCollected: string | undefined,
    organisation: [string | undefined, string | undefined],
    selected: boolean
};

/* Props Type */
type Props = {
    pagination: PaginationObject
};


/**
 * Component that renders the search results table on the search page
 * @param pagination The pagination object used to index the digital specimen results
 * @returns JSX Component
 */
const SearchResults = (props: Props) => {
    const { pagination } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const trigger = useTrigger();

    /* Data table configuration */
    const { columns } = SearchResultsTableConfig();

    /* Base variables */
    const searchDigitalSpecimen = useAppSelector(getSearchDigitalSpecimen);
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const phylopicBuild = useAppSelector(getPhylopicBuild);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const taxonomyIcons: { [taxonomyIdentification: string]: string | Dict } = {};

    /**
     * Function to determine the icon being shown with the digital specimen in the search results
     * @param digitalSpecimen The digital specimen to do an icon check for
     */
    const DetermineTableRowIcon = (digitalSpecimen: DigitalSpecimen): Promise<string | Dict | undefined> => {
        /* Base variables */
        const nonBiologicalTopicDisciplines = ['Anthropology', 'Other Geodiversity', 'Other Biodiversity', 'Ecology', 'Geology', 'Astrogeology', 'Unclassified'];
        const topicDisciplines = searchParams.getAll('topicDiscipline');
        let icon: Promise<Dict | string | undefined> = Promise.resolve(undefined);

        /* If not any or a single non biological topic discipline is selected, use topic discipline icon */
        if (!topicDisciplines.length || topicDisciplines.some(topicDiscipline => nonBiologicalTopicDisciplines.includes(topicDiscipline))) {
            icon = DetermineTopicDisciplineIcon(digitalSpecimen['ods:topicDiscipline']);
        } else {
            /* Determine accepted identification and most relevant taxonomic level to base icon on */
            const acceptedIdentification = digitalSpecimen?.['ods:hasIdentification']?.find((identification) =>
                identification['ods:isVerifiedIdentification']
            );
            let taxonomyIdentification: string | undefined = digitalSpecimen['ods:specimenName']?.split(' ')[0];

            if (acceptedIdentification?.['ods:hasTaxonIdentification']?.[0]['dwc:order']) {
                /* Search icon by order */
                taxonomyIdentification = acceptedIdentification['ods:hasTaxonIdentification'][0]['dwc:order'];
            } else if (acceptedIdentification?.['ods:hasTaxonIdentification']?.[0]['dwc:family']) {
                /* Search icon by family */
                taxonomyIdentification = acceptedIdentification?.['ods:hasTaxonIdentification'][0]['dwc:family'];
            } else if (acceptedIdentification?.['ods:hasTaxonIdentification']?.[0]['dwc:genus']) {
                /* Search icon by genus */
                taxonomyIdentification = acceptedIdentification?.['ods:hasTaxonIdentification'][0]['dwc:genus'];
            }

            /* Try to fetch a taxonomy based icon from Phylopic if not already present in the taxonomy icon url array and add it to the table record */
            if (taxonomyIdentification && taxonomyIdentification in taxonomyIcons) {
                icon = Promise.resolve(taxonomyIcons[taxonomyIdentification]);
            } else if (taxonomyIdentification) {
                icon = GetPhylopicIcon(phylopicBuild, taxonomyIdentification);

                /* Add to dictionary of known taxonomic identifications and icon urls */
                taxonomyIcons[taxonomyIdentification] = icon;
            }
        };

        return icon;
    };

    /* OnChange of pagination records, construct table data */
    trigger.SetTrigger(() => {
        /* Only rerender if search digital specimen is not in pagination records */
        const tableDataArray: DataRow[] = [];

        pagination.records.forEach((record, index) => {
            /* Record is equal to type Digital Specimen */
            const digitalSpecimen = record as DigitalSpecimen;

            tableDataArray.push({
                index,
                DOI: digitalSpecimen['ods:ID'],
                taxonomyIconUrl: !isEmpty(tableData) && tableData[index] && tableData[index].DOI === digitalSpecimen['ods:ID'] ? tableData[index].taxonomyIconUrl : DetermineTableRowIcon(digitalSpecimen),
                specimenName: digitalSpecimen['ods:specimenName'],
                physicalSpecimenID: digitalSpecimen['ods:normalisedPhysicalSpecimenID'],
                topicDiscipline: digitalSpecimen['ods:topicDiscipline'],
                countryOfOrigin: digitalSpecimen['ods:hasEvent']?.[0]?.['ods:Location']?.['dwc:country'],
                dateCollected: digitalSpecimen['ods:hasEvent']?.[0]?.['dwc:eventDate'],
                organisation: digitalSpecimen['ods:institutionName'] ?
                    [digitalSpecimen['ods:institutionName'], digitalSpecimen['dwc:institutionID']]
                    : [digitalSpecimen['dwc:institutionID'], digitalSpecimen['dwc:institutionID']],
                selected: compareDigitalSpecimen ? !!(compareDigitalSpecimen.find((compareDigitalSpecimen) => compareDigitalSpecimen['ods:ID'] === digitalSpecimen['ods:ID'])) : false
            });
        });

        setTableData(tableDataArray);
    }, [pagination.records]);

    /* OnChange of selected digital specimen, set active table row */
    trigger.SetTrigger(() => {
        tableData.forEach(tableRow => {
            tableRow.selected = compareDigitalSpecimen ? !!(compareDigitalSpecimen?.find(digitalSpecimen => digitalSpecimen['ods:ID'] === tableRow.DOI)) : false;
        });

        setTableData([...tableData]);
    }, [compareDigitalSpecimen]);

    return (
        <div className="h-100 d-flex flex-column">
            {/* Search results data table */}
            <Row className="flex-grow-1 overflow-hidden">
                <Col className="h-100">
                    <div className="h-100 position-relative bgc-white b-secondary-hard br-corner">
                        {/* Data table */}
                        <DataTable columns={columns}
                            data={tableData}
                            selectedRowIndex={tableData.findIndex(tableRow => tableRow.DOI === searchDigitalSpecimen?.['ods:ID'])}
                            SelectAction={(row: DataRow) => {
                                /* If compare is active, handle compare selection, otherwise open specimen in id card */
                                if (compareDigitalSpecimen) {
                                    const index = compareDigitalSpecimen.findIndex(digitalSpecimen => digitalSpecimen['ods:ID'] === row.DOI);

                                    /* If row is already checked, remove from compare digital specimen array, other wise add */
                                    if (index >= 0) {
                                        const updatedCompareDigitalSpecimen = [...compareDigitalSpecimen];

                                        updatedCompareDigitalSpecimen.splice(index, 1);

                                        dispatch(setCompareDigitalSpecimen(updatedCompareDigitalSpecimen));
                                    } else if (compareDigitalSpecimen.length < 10) {
                                        const digitalSpecimen: DigitalSpecimen | undefined = pagination.records.find(digitalSpecimen => digitalSpecimen['ods:ID'] === row.DOI) as DigitalSpecimen | undefined;

                                        dispatch(setCompareDigitalSpecimen([
                                            ...(compareDigitalSpecimen),
                                            ...(digitalSpecimen ? [digitalSpecimen] : [])
                                        ]));
                                    }
                                } else {
                                    const digitalSpecimen = pagination.records.find(digitalSpecimen => digitalSpecimen['ods:ID'] === row.DOI) as DigitalSpecimen | undefined;

                                    dispatch(setSearchDigitalSpecimen(digitalSpecimen));
                                }
                            }}
                        />

                        {/* Loading screen for data table when pagination is loading */}
                        <LoadingScreen visible={pagination.loading}
                            className="br-corner"
                            displaySpinner
                        />
                    </div>
                </Col>
            </Row>
            {/* Total result count and paginator */}
            <Row className="mt-2 position-relative">
                {/* Total amount of found records */}
                <Col lg="auto"
                    className="h-100 position-absolute start-0 d-flex align-items-center"
                >
                    <p className="fs-4 fw-lightBold">Specimen found: {pagination.totalRecords >= 0 ? pagination.totalRecords : 'loading...'}</p>
                </Col>
                {/* Paginator, if there are search results, otherwise have dummy in place */}
                <Col className="d-flex justify-content-center">
                    {pagination.totalRecords ?
                        <Paginator pagination={pagination} />
                        : <div className="page-item" />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default SearchResults;