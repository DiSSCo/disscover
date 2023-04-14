/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getErrorMessage, setErrorMessage } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from './errorMessage.module.scss';


const ErrorMessage = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const errorMessage = useAppSelector(getErrorMessage);
    const [active, setActive] = useState(false);

    /* OnChange of Error Message */
    useEffect(() => {
        /* Check if Error Message is not empty */
        if (errorMessage) {
            setActive(true);

            setTimeout(() => {
                setActive(false);

                /* Reset Error Message */
                dispatch(setErrorMessage(''));
            }, 4500);
        }
    }, [errorMessage]);

    /* ClassName for Error Message */
    const classErrorMessage = classNames({
        [`${styles.errorMessage}`]: true,
        [`${styles.active}`]: active
    });

    return (
        <div className={`${classErrorMessage} px-3 py-2 position-absolute top-0 mt-5 start-0 end-0`}>
            <p className={`${styles.errorMessageTitle} fw-bold`}> Something went Wrong! </p>

            <p className={styles.errorMessageContent}> {errorMessage} </p> 
        </div>
    );
}

export default ErrorMessage;