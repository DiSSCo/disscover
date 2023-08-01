/* Import Dependencies */
import { Link } from 'react-router-dom';

/* Import Types */
import { DigitalMedia } from "global/Types";

/* Import Styling */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Image = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <Link to={`/dm/${digitalMedia.id.replace('https://hdl.handle.net/', '')}`}>
            <div className="position-relative">
                <img src={digitalMedia.mediaUrl}
                    alt={digitalMedia.id}
                    className="w-100 rounded"
                />

                <div className={`${styles.imageHover} position-absolute transition 
                        h-100 w-100 top-0 d-flex justify-content-center align-items-center c-pointer px-3`
                }>
                    <p className="fw-bold"> {digitalMedia.id.replace('https://hdl.handle.net/', '')} </p>
                </div>
            </div>
        </Link>
    );
}

export default Image;