/* Import Components */
import { Capitalize } from 'app/Utilities';
import { Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    filterKey: string,
    filterValues: string[],
    RemoveFilter: Function
};


const ActiveFiltersTag = (props: Props) => {
    const { filterKey, filterValues, RemoveFilter } = props;

    return (
        <>
            {filterValues.map((filter: string) => {
                return (
                    <Col key={filter} className={`col-md-auto pe-0 pb-2`}>
                        <div className={`${styles.activeFilter} fs-4 fw-lightBold px-2 py-1`}>
                            <FontAwesomeIcon icon={faCircleXmark}
                                className="fs-5 c-pointer pe-1 c-primary"
                                onClick={() => RemoveFilter(filter)}
                            />

                            {`${Capitalize(filterKey)}: ${filter}`}
                        </div>
                    </Col>
                );
            })
            }
        </>
    );
}

export default ActiveFiltersTag;