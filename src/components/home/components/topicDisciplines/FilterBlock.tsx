/* Import Dependencies */
import { Field } from 'formik';
import CountUp from 'react-countup';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/home/home.module.scss';


/* Props Typing */
interface Props {
    type: string,
    title: string,
    subTitle?: string,
    discipline: number,
    icon?: string,
    ToggleFilterType: Function
};


const FilterBlock = (props: Props) => {
    const { type, title, subTitle, discipline, icon, ToggleFilterType } = props;

    return (
        <button type="button"
            className={`${styles.specimenTypeBlock} position-relative w-100 b-none z-1 mb-3`}
            onClick={() => ToggleFilterType()}
        >
            <div className="d-block position-absolute top-0 start-0 end-0 z-1 w-100 h-100"
                style={{
                    backgroundImage: `url(${icon})`,
                    backgroundSize: '5rem 5rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top 0.5rem right 2rem',
                    filter: 'invert(32%) sepia(65%) saturate(1776%) hue-rotate(158deg) brightness(95%) contrast(76%)'
                }}
            />

            <div className="position-absolute top-0 start-0 end-0 h-100 w-100 py-2 px-3"
                style={{
                    zIndex: 9999
                }}
            >
                <Row className="h-50 z-2 position-relative">
                    <Col>
                        {subTitle &&
                            <p className="fs-4 c-secondary fw-lightBold"> {subTitle} </p>
                        }

                        <p className="fw-lightBold"> {title} </p>
                    </Col>
                    <Col className="col-md-auto">
                        <Field name={`disciplines.${type}`}
                            type="checkbox"
                            className={styles.specimenTypeCheckbox}
                        />
                    </Col>
                </Row>
                <Row className="h-50 z-2 position-relative">
                    <Col className="d-flex justify-content-end align-items-end">
                        <p className="fs-3 fw-lightBold"> <CountUp end={discipline} /> </p>
                    </Col>
                </Row>
            </div>
        </button>
    );
}

export default FilterBlock;