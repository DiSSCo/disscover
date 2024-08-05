/* Import Dependencies */
import classNames from "classnames";

/* Import Styling */
import styles from './image.module.scss';


/* Props Typing */
type Props = {
    accessURI: string,
    sizeOrientation: 'width' | 'height',
    hoverText?: string
};


/**
 * Component that renders a element for displaying images with an optional hover text
 * @param accessURI The URL on which the media can be accessed
 * @returns JSX Component
 */
const Image = (props: Props) => {
    const { accessURI, sizeOrientation, hoverText } = props;

    /* Class Names */
    const classSizeOrientation = classNames({
        'w-100': sizeOrientation === 'width',
        'h-100': sizeOrientation === 'height'
    });

    return (
        <div className="d-flex position-relative h-100 w-100 justify-content-center">
            <img src={accessURI}
                alt={accessURI}
                className={`${classSizeOrientation} rounded`}
            />

            {hoverText &&
                <div className={`${styles.image} opacity-0 position-absolute transition 
                        h-100 w-100 top-0 d-flex justify-content-center align-items-center c-pointer px-3`
                }>
                    <p className="fw-bold"> {hoverText} </p>
                </div>
            }
        </div>
    );
};

export default Image;