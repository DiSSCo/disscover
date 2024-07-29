/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import { Spinner } from './elements/customUI/CustomUI';


/**
 * Component that renders a loading page for when the application is loading
 * @returns JSX Component
 */
const Loading = () => {
    /* Base variables */
    const [loadingMessage, setLoadingMessage] = useState<string>('start');

    useEffect(() => {
        setTimeout(() => setLoadingMessage('Now loading'), 2000);

        /* After 10 seconds, display message: 'taking longer than expected' */
        setTimeout(() => setLoadingMessage('Taking longer than expected'), 10 * 1000);

        /* After 30 seconds, stop spinner and display that something might be wrong, retry or contact the helpdesk */
        setTimeout(() => setLoadingMessage('error'), 30 * 1000);
    }, []);

    return (
        <Container fluid className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
                <Col lg="auto"
                    className="text-center"
                >
                    {!['start', 'error'].includes(loadingMessage) ?
                        <>
                            <h1 className="tc-primary fw-bold">DiSSCover</h1>

                            <Spinner className="fs-1 my-3" />

                            <p className="fs-2 mt-4">{loadingMessage}</p>
                        </>

                        : <>
                            {loadingMessage === 'error' &&
                                <>
                                    <h1 className="tc-primary fw-bold">DiSSCover</h1>

                                    <p className="fs-2 m-4">
                                        {`Something might be wrong, please `}
                                        <a href="."
                                            className="tc-accent"
                                        >
                                            try again
                                        </a>
                                        {` or refer to the helpdesk for support`}
                                    </p>
                                </>
                            }
                        </>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Loading;