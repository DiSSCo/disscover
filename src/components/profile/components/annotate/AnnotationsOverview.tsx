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

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

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
        property: string,
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
        name: 'Property',
        selector: row => row.property,
        id: 'search_name',
        sortable: true
    }, {
        name: 'Motivation',
        selector: row => row.motivation,
        id: 'search_country',
        sortable: true
    }, {
        name: 'Annotation',
        selector: row => row.annotationValue,
        id: 'search_type',
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
                property: annotation['oa:target']['oa:selector']?.['ods:field'] as string ?? '',
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
        <Row className="h-100">
            <Col className="h-100">
                <div className="h-100 d-flex flex-column">
                    <Row className={`${styles.annotationsTable} flex-grow-1 pb-2`}>
                        <Col className="h-100">
                            <div className="h-100 overflow-scroll b-secondary rounded-c">
                                <DataTable
                                    columns={tableColumns}
                                    data={tableData}
                                    customStyles={customStyles}
                                    onRowClicked={(row) => {
                                        if (row.target.type === 'digital_specimen') {
                                            navigate(`/ds/${row.target.id.replace(process.env.REACT_APP_DOI_URL as string, '')}`);
                                        } else if (row.target.type === 'digital_media') {
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
            </Col>
        </Row>
    );
}

export default AnnotationsOverview;