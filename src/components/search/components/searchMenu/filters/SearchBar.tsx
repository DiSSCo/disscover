/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
    return (
        <Row className={`${styles.filterBlock} h-100`}>
            <Col md={{ span: 12 }} className={`${styles.searchBlock} pt-3 pb-4 px-4`}>
                <Row>
                    <Col md={{ span: 12 }} className="text-white position-relative">
                        <h6>
                            Search for specimens:
                        </h6>

                        <Field type="text" name="filters.q"
                            className={`${styles.searchBar} w-100`}
                            placeholder="Iguanodon"
                        />

                        <button type="submit" className={`${styles.searchBarIcon} position-absolute bg-white border-0`}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}

export default SearchBar;