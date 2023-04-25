/* Import Dependencies */
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUserProfileAnnotations, setUserProfileAnnotations } from 'redux/user/UserSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import Components */
import Paginator from 'components/general/paginator/Paginator';

/* Import API */
import GetUserAnnotations from 'api/user/GetUserAnnotations';


const AnnotationsOverview = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const userAnnotations = useAppSelector(getUserProfileAnnotations);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});

    interface DataRow {
        index: number,
        id: string,
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
            let annotationValue: string = '';

            if (annotation.body.value) {
                if (typeof (annotation.body.value) !== 'string') {
                    annotationValue = annotation.body.value.join(' ');
                } else {
                    annotationValue = annotation.body.value;
                }
            }

            tableData.push({
                index: index,
                id: annotation.id,
                property: annotation.target.indvProp,
                motivation: annotation.motivation,
                annotationValue: annotationValue
            });
        });

        setTableData(tableData);
    }, [userAnnotations]);

    return (
        <Row className="h-100">
            <Col className="h-100 px-4">
                <Row className={styles.annotationsTable}>
                    <Col>
                        <DataTable
                            columns={tableColumns}
                            data={tableData}

                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </Col>
                </Row>
                <Row className={`${styles.annotationsTablePaginator} justify-content-center`}>
                    <Col className="col-md-auto">
                        <Paginator pageNumber={pageNumber}
                            links={paginatorLinks}

                            SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AnnotationsOverview;