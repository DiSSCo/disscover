/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Config */
import SearchResultsTableConfig from 'app/config/tables/SearchResultsTableConfig';

/* Import Types */
import { DigitalSpecimen, PaginationObject } from 'app/Types';

/* Import Utilities */
import { DetermineScientificName } from 'app/utilities/NomenclaturalUtilities';

/* Import Components */
import { Paginator } from 'components/elements/Elements';
import { DataTable, LoadingScreen } from 'components/elements/customUI/CustomUI';


/* Data table row type */
type DataRow = {
    index: number,
    DOI: string,
    accessionName: string | undefined,
    accessionId: string | undefined,
    scientificName: string | undefined,
    specimenType: string | undefined,
    origin: string | undefined,
    collected: string | undefined,
    holder: [string | undefined, string | undefined],
    topicDiscipline: string | undefined,
    taxonomyIconUrl: string | undefined,
    selected: boolean,
    // compareSelected: boolean
};

/* Props Type */
type Props = {
    pagination: PaginationObject
};


const SearchResults = (props: Props) => {
    const { pagination } = props;

    /* Data table configuration */
    const { columns } = SearchResultsTableConfig();

    /* Base variables */
    const tableData: DataRow[] = [];

    /* Construct table data */
    pagination.records.forEach((record, index) => {
        /* Record is equal to type Digital Specimen */
        const digitalSpecimen = record as DigitalSpecimen;

        tableData.push({
            index,
            DOI: digitalSpecimen.digitalSpecimen['ods:id'],
            accessionName: digitalSpecimen.digitalSpecimen['ods:specimenName'],
            accessionId: digitalSpecimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId'],
            scientificName: DetermineScientificName(digitalSpecimen),
            specimenType: digitalSpecimen.digitalSpecimen['ods:topicDiscipline'],
            origin: digitalSpecimen.digitalSpecimen.occurrences?.[0]?.location?.['dwc:country'],
            collected: digitalSpecimen.digitalSpecimen.occurrences?.[0]?.['dwc:eventDate'],
            holder: digitalSpecimen.digitalSpecimen['dwc:institutionName'] ?
                [digitalSpecimen.digitalSpecimen['dwc:institutionName'], digitalSpecimen.digitalSpecimen['dwc:institutionId']]
                : [digitalSpecimen.digitalSpecimen['dwc:institutionId'], digitalSpecimen.digitalSpecimen['dwc:institutionId']],
            topicDiscipline: digitalSpecimen.digitalSpecimen['ods:topicDiscipline'],
            taxonomyIconUrl: '',
            selected: false,
            // compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.digitalSpecimen['ods:id'] === specimen.digitalSpecimen['ods:id'])
        });
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Search results data table */}
            <Row className="flex-grow-1 overflow-hidden">
                <Col className="h-100">
                    <div className="h-100 position-relative bgc-white b-secondary-hard br-corner">
                        {/* Data table */}
                        <DataTable columns={columns}
                            data={tableData}
                            SelectAction={() => { }}
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