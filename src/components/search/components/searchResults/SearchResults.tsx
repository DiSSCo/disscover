/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { GetSpecimenNameHTMLLabel } from 'app/utilities/NomenclaturalUtilities';

/* Import Config */
import SearchResultsTableConfig from 'app/config/table/SearchResultsTableConfig';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { getSearchDigitalSpecimen, setSearchDigitalSpecimen, getCompareDigitalSpecimen, setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { PaginationObject } from 'app/Types';

/* Import Components */
import { Paginator } from 'components/elements/Elements';
import { DataTable, LoadingScreen } from 'components/elements/customUI/CustomUI';


/* Data table row type */
type DataRow = {
    index: number,
    DOI: string,
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
    const trigger = useTrigger();

    /* Data table configuration */
    const { columns } = SearchResultsTableConfig();

    /* Base variables */
    const searchDigitalSpecimen = useAppSelector(getSearchDigitalSpecimen);
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const [tableData, setTableData] = useState<DataRow[]>([]);

    /* OnChange of pagination records, construct table data */
    trigger.SetTrigger(() => {
        /* Only rerender if search digital specimen is not in pagination records */
        const tableDataArray: DataRow[] = [];

        pagination.records.forEach((record, index) => {
            /* Record is equal to type Digital Specimen */
            const digitalSpecimen = record as DigitalSpecimen;

            tableDataArray.push({
                index,
                DOI: digitalSpecimen['@id'],
                specimenName: GetSpecimenNameHTMLLabel(digitalSpecimen),
                physicalSpecimenID: digitalSpecimen['ods:normalisedPhysicalSpecimenID'],
                topicDiscipline: digitalSpecimen['ods:topicDiscipline'],
                countryOfOrigin: digitalSpecimen['ods:hasEvents']?.[0]?.['ods:hasLocation']?.['dwc:country'],
                dateCollected: digitalSpecimen['ods:hasEvents']?.[0]?.['dwc:eventDate'],
                organisation: digitalSpecimen['ods:organisationName'] ?
                    [digitalSpecimen['ods:organisationName'], digitalSpecimen['ods:organisationID']]
                    : [digitalSpecimen['ods:organisationID'], digitalSpecimen['ods:organisationID']],
                selected: compareDigitalSpecimen ? !!(compareDigitalSpecimen.find((compareDigitalSpecimen) => compareDigitalSpecimen['@id'] === digitalSpecimen['@id'])) : false
            });
        });

        setTableData(tableDataArray);
    }, [pagination.records]);

    /* OnChange of selected digital specimen, set active table row */
    trigger.SetTrigger(() => {
        tableData.forEach(tableRow => {
            tableRow.selected = compareDigitalSpecimen ? !!(compareDigitalSpecimen?.find(digitalSpecimen => digitalSpecimen['@id'] === tableRow.DOI)) : false;
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
                            selectedRowIndex={tableData.findIndex(tableRow => tableRow.DOI === searchDigitalSpecimen?.['@id'])}
                            SelectAction={(row: DataRow) => {
                                /* If compare is active, handle compare selection, otherwise open specimen in id card */
                                if (compareDigitalSpecimen) {
                                    const index = compareDigitalSpecimen.findIndex(digitalSpecimen => digitalSpecimen['@id'] === row.DOI);

                                    /* If row is already checked, remove from compare digital specimen array, other wise add */
                                    if (index >= 0) {
                                        const updatedCompareDigitalSpecimen = [...compareDigitalSpecimen];

                                        updatedCompareDigitalSpecimen.splice(index, 1);

                                        dispatch(setCompareDigitalSpecimen(updatedCompareDigitalSpecimen));
                                    } else if (compareDigitalSpecimen.length < 10) {
                                        const digitalSpecimen: DigitalSpecimen | undefined = pagination.records.find(digitalSpecimen => digitalSpecimen['@id'] === row.DOI) as DigitalSpecimen | undefined;

                                        dispatch(setCompareDigitalSpecimen([
                                            ...(compareDigitalSpecimen),
                                            ...(digitalSpecimen ? [digitalSpecimen] : [])
                                        ]));
                                    }
                                } else {
                                    const digitalSpecimen = pagination.records.find(digitalSpecimen => digitalSpecimen['@id'] === row.DOI) as DigitalSpecimen | undefined;

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