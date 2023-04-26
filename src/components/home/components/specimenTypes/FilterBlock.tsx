/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/home/home.module.scss';


/* Props Typing */
interface Props {
    type: string,
    title: string,
    subTitle?: string
};


const FilterBlock = (props: Props) => {
    const { type, title, subTitle } = props;

    return (
        <div className={`${styles.specimenTypeBlock} py-2 px-3 mb-3`}>
            <Row className="h-50">
                <Col>
                    {subTitle &&
                        <p className={styles.specimenTypeSubTitle}> {subTitle} </p>
                    }

                    <p className={styles.specimenTypeTitle}> {title} </p>
                </Col>
                <Col className="col-md-auto">
                    <Field name={`specimenTypes.${type}`}
                        type="checkbox"
                        className={styles.specimenTypeCheckbox}
                    />
                </Col>
            </Row>
            <Row className="h-50">
                <Col className="d-flex justify-content-end align-items-end">
                    <p className={styles.specimenTypeAmount}> 0 </p>
                </Col>
            </Row>
        </div>
    );
}

export default FilterBlock;