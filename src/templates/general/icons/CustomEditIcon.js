import { useState } from 'react';
import './icons.css';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";


const CustomEditIcon = (props) => {
    const [hover, setHover] = useState();
    const [clickedOn, setClickedOn] = useState(false);

    return (
        <div className="position-relative d-flex justify-content-center align-items-center"
            onClick={() => { props.ToggleEditMode(); setClickedOn(!clickedOn) }}
        >
            {!clickedOn ?
                <>
                    <div className={`editIconCover ${hover} rounded-circle position-absolute z-0`} />

                    <FontAwesomeIcon icon={faPencil}
                        className="editIcon z-1 position-relative"
                        onMouseEnter={() => setHover('active')}
                        onMouseLeave={() => setHover()}
                    />
                </>
                : <>
                    <div className={`editIconCover ${hover} rounded-circle position-absolute z-0`} />

                    <FontAwesomeIcon icon={faX}
                        className="editIcon active z-1 position-relative"
                    />
                </>
            }
        </div>
    );
}

export default CustomEditIcon;