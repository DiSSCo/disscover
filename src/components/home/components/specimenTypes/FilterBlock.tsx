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

    console.log(icon);

    return (
        <div className={`${styles.specimenTypeBlock} py-2 px-3 mb-3 position-relative`}
            style={{
                backgroundImage: `url(${icon})`,
                backgroundSize: '4rem 4rem',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top 0.5rem right 2.5rem'
            }}
            onClick={() => ToggleFilterType()}
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
                    <p className={styles.specimenTypeAmount}> <CountUp end={discipline} /> </p>
                </Col>
            </Row>
        </div>
    );
}

export default FilterBlock;