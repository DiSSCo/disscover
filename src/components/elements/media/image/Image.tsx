/* Import Dependencies */
import classNames from "classnames";


/* Props Typing */
type Props = {
    accessURI: string,
    sizeOrientation: 'width' | 'height',
};


/**
 * Component that renders a element for displaying images with an optional hover text
 * @param accessURI The URL on which the media can be accessed
 * @returns JSX Component
 */
const Image = (props: Props) => {
    const { accessURI, sizeOrientation } = props;

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
        </div>
    );
};

export default Image;