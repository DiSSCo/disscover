/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setOverviewAnnotations } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from './annotate.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import AnnotationsTable from './components/AnnotationsTable';
import Paginator from 'components/general/paginator/Paginator';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetRecentAnnotations from 'api/annotate/GetRecentAnnotations';


const Annotate = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});

    /* Get Recent Annotations */
    useEffect(() => {
        GetRecentAnnotations(pageSize, pageNumber).then((annotations) => {
            dispatch(setOverviewAnnotations(annotations));
        });
    }, [pageNumber]);

    return (
        <div className="min-vh-100">
            <Header />

            <Container fluid className={`${styles.annotateContent} mt-5`}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col>
                                <h2 className={`${styles.title}`}> Annotations </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AnnotationsTable />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="d-flex justify-content-center">
                                <Paginator pageNumber={pageNumber}
                                    links={paginatorLinks}

                                    SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Annotate;