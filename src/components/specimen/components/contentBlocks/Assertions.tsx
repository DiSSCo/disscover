/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';
import classNames from "classnames";

/* Import Store */
import { useAppSelector } from "app/hooks";
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Components */
import PropertiesTable from './PropertiesTable';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const Assertions = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    return (
        <>
            {specimen.digitalSpecimen.assertions?.length ? <>
                {specimen.digitalSpecimen.assertions?.map((assertion, index) => {
                    const key = `assertion${index}`;

                    /* ClassNames */
                    const CardClass = classNames({
                        'mt-3': index > 0
                    });

                    return (
                        <Card key={key} className={CardClass}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <p className="fs-2 fw-lightBold">
                                            {`Assertion #${++index}`}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="mt-3">
                                            <PropertiesTable
                                                title="Properties"
                                                properties={assertion}
                                                ShowWithAnnotations={(property: string) => ShowWithAnnotations(property)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                })}
            </>
                : <Card className="h-100 d-flex justify-content-center align-items-center">
                    <p> No assertions present </p>
                </Card>
            }
        </>
    );
}

export default Assertions;