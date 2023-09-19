/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

/* Import Styles */
import styles from './promptMessage.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    promptMessage: { message: string, template?: string },
    RemovePromptMessage: Function
};


const PromptMessage = (props: Props) => {
    const { promptMessage, RemovePromptMessage } = props;

    /* Base variables */
    const [active, setActive] = useState(false);

    /* Show Prompt Message and hide after some time */
    useEffect(() => {
        setActive(true);
    }, []);

    setTimeout(() => {
        setActive(false);

        /* Remove Prompt Message from array */
        RemovePromptMessage();
    }, 5000);

    /* ClassNames */
    const classPromptMessage = classNames({
        [`${styles.promptMessage} opacity-0 mx-auto transition`]: true,
        [`${styles.active}`]: active
    });

    const classPromptTemplate = classNames({
        [`${styles[promptMessage.template ?? '']}`]: promptMessage.template,
    });

    const classLoadingBar = classNames({
        [`${styles.loadingBar} w-0 bgc-primary rounded-full`]: true,
        'w-100': active
    });

    return (
        <div className={`${classPromptMessage} px-3 py-2 position-absolute bottom-0 end-0 bgc-white me-3 mb-4 b-grey rounded-c`}>
            <div>
                <span className="fs-3 fw-bold"> Notification </span>
                <span className="float-end c-greyDark"> <FontAwesomeIcon icon={faX} /> </span>
            </div>

            <p className={`${classPromptTemplate} fs-4 mt-2 px-3 py-2 rounded-c`}> {promptMessage.message} </p>

            <div className={`${classLoadingBar} mt-5`} />
        </div>
    );
}

export default PromptMessage;