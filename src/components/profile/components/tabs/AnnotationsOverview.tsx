/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUserProfileAnnotations, setUserProfileAnnotations } from 'redux/user/UserSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import Paginator from 'components/general/paginator/Paginator';

/* Import API */
import GetUserAnnotations from 'api/user/GetUserAnnotations';


const AnnotationsOverview = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const userAnnotations = useAppSelector(getUserProfileAnnotations);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});

    interface DataRow {
        index: number,
        id: string,
        target: Dict,
        propertyName: string,
        motivation: string,
        annotationValue: string
    };

    /* OnChange of Pagination Range: try to fetch User Annotations by new range */
    useEffect(() => {
        GetUserAnnotations(KeycloakService.GetToken(), pageSize, pageNumber).then(({ userAnnotations, links }) => {
            if (!isEmpty(userAnnotations) && userAnnotations) {
                /* Set User Annotations */
                dispatch(setUserProfileAnnotations(userAnnotations));

                /* Set Paginator links */
                setPaginatorLinks(links);
            }
        });
    }, [pageNumber]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Target Name',
        selector: row => row.propertyName,
        id: 'search_name',
        sortable: true,
        wrap: true
    }, {
        name: 'Motivation',
        selector: row => row.motivation,
        id: 'search_country',
        sortable: true,
        wrap: true
    }, {
        name: 'Annotation',
        selector: row => row.annotationValue,
        id: 'search_type',
        wrap: true
    }];

    /* OnChange of User Annotations: set Table Data */
    useEffect(() => {
        const tableData: DataRow[] = [];

        userAnnotations.forEach((annotation, index) => {
            const annotationValue: string = annotation['oa:body']['oa:value'].join(' ');

            tableData.push({
                index: index,
                id: annotation['ods:id'],
                target: annotation['oa:target'],
                propertyName: annotation['oa:target']['oa:selector']?.['ods:field'] as string
                    ?? annotation['oa:target']['oa:selector']?.['oa:class']
                    ?? (annotation['oa:target']['oa:selector']?.['ac:hasRoi'] && 'Visual Annotation')
                    ?? '',
                motivation: annotation['oa:motivation'],
                annotationValue: annotationValue
            });
        });

        setTableData(tableData);
    }, [userAnnotations]);

    /* Custom styles for Data Table */
    const customStyles = {
        head: {
            style: {
                color: 'white',
                fontSize: '14px'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
            }
        },
        rows: {
            style: {
                minHeight: '40px'
            },
            highlightOnHoverStyle: {
                backgroundColor: '#98cdbf',
            },
            stripedStyle: {
                backgroundColor: '#eef7f4'
            }
        }
    };

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 pb-2 overflow-hidden">
                <Col className="h-100">
                    <div className="h-100 overflow-scroll b-secondary rounded-c">
                        <DataTable
                            columns={tableColumns}
                            data={tableData}
                            customStyles={customStyles}
                            onRowClicked={(row) => {
                                if (row.target.type === 'DigitalSpecimen') {
                                    navigate(`/ds/${row.target.id.replace(process.env.REACT_APP_DOI_URL as string, '')}`);
                                } else if (row.target.type === 'DigitalMedia') {
                                    navigate(`/dm/${row.target.id.replace(process.env.REACT_APP_DOI_URL as string, '')}`);
                                }
                            }}

                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                </Col>
            </Row>

            <Row className={`justify-content-center`}>
                <Col className="col-md-auto">
                    <Paginator pageNumber={pageNumber}
                        links={paginatorLinks}

                        SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default AnnotationsOverview;