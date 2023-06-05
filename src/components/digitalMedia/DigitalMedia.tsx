/* Import Dependencies */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getDigitalMedia, setDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Styles */
import styles from './digitalMedia.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import TitleBar from './components/TitleBar';
import IDCard from './components/IDCard/IDCard';
import DigitalMediaFrame from './components/digitalMedia/DigitalMediaFrame';
import DigitalMediaList from './components/digitalMedia/DigitalMediaList';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetDigitalMedia from 'api/digitalMedia/GetDigitalMedia';


const DigitalMedia = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    const params = useParams();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* OnLoad: Check for Digital Media, otherwise grab from database */
    useEffect(() => {
        const digitalMediaId = `${params.prefix}/${params.suffix}`;

        /* Fetch Digital Media if not present */
        if (isEmpty(digitalMedia) || digitalMedia.id.replace('https://hdl.handle.net/', '') !== digitalMediaId) {
            GetDigitalMedia(`${params['prefix']}/${params['suffix']}`).then((digitalMedia) => {
                if (digitalMedia) {
                    dispatch(setDigitalMedia(digitalMedia));
                }
            });
        }
    }, [digitalMedia, params]);

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <Header />

            {Object.keys(digitalMedia).length > 0 &&
                <Container fluid className={`${styles.content} pt-5`}>
                    <Row className="h-100">
                        <Col md={{ span: 10, offset: 1 }} className="h-100">
                            <div className="h-100 d-flex flex-column">
                                <Row className={styles.titleBar}>
                                    <Col>
                                        <TitleBar />
                                    </Col>
                                </Row>
                                <Row className={`${styles.specimenContent} py-4 flex-grow-1 overflow-hidden`}>
                                    <Col md={{ span: 3 }} className="h-100">
                                        <IDCard ToggleModal={() => console.log('Toggle Modal')} />
                                    </Col>
                                    <Col md={{ span: 9 }} className="h-100">
                                        <div className="h-100 d-flex flex-column">
                                            <Row className="flex-grow-1 overflow-hidden">
                                                <Col className="h-100 pb-2">
                                                    <DigitalMediaFrame />
                                                </Col>
                                            </Row>
                                            <Row className={styles.digitalMediaListBlock}>
                                                <Col className="h-100">
                                                    <DigitalMediaList />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container >
            }

            <Footer />
        </div >
    );
}

export default DigitalMedia;