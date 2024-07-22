/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Buttons */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    compareDigitalSpecimen: DigitalSpecimen[] | undefined
};


/**
 * Component that renders the top bar on the compare digital specimen page
 * @returns JSX Component
 */
const TopBar = (props: Props) => {
    const {compareDigitalSpecimen} = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [seachParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div>
            <Row>
                <Col>
                    <Button type="button"
                        variant="secondary"
                        disabled={seachParams.getAll('ds').length >= 10}
                        OnClick={() => {
                            /* Reset compare digital specimen to selected options */
                            dispatch(setCompareDigitalSpecimen(compareDigitalSpecimen));

                            /* Navigate to the search page */
                            navigate('/search');
                        }}
                    >
                        <p>Select additional specimen</p>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;