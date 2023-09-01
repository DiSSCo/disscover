/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

/* Import Styles */
import './icons.css';
import styles from './icons.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    editMode: boolean,
    ToggleEditMode: Function
};


const CustomEditIcon = (props: Props) => {
    const { editMode, ToggleEditMode } = props;

    /* Functionality for handling hover and click state of custom button */
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!editMode) {
            setHover(false);
        }
    }, [editMode])

    /* ClassName for Edt Icon Cover */
    const classEditIconCover = classNames({
        [`${styles.editIconCover}`]: true,
        [`${styles.active}`]: hover
    });

    return (
        <div className="position-relative d-flex justify-content-center align-items-center"
            onClick={() => ToggleEditMode()}
        >
            <div className={`${classEditIconCover} rounded-circle position-absolute z-0`} />

            <FontAwesomeIcon icon={!editMode ? faPencil : faX}
                className={`${styles.editIcon} c-pointer z-1 position-relative`}
                onMouseEnter={() => { if (!editMode) { setHover(true) } }}
                onMouseLeave={() => { if (!editMode) { setHover(false) } }}
            />
        </div>
    );
}

export default CustomEditIcon;