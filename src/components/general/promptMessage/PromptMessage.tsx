/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Toast } from 'react-bootstrap';

/* Import Styles */
import styles from './promptMessage.module.scss';


/* Props Typing */
interface Props {
    promptMessage: { message: string, template?: string },
    RemovePromptMessage: Function
};


const PromptMessage = (props: Props) => {
    const { promptMessage, RemovePromptMessage } = props;

    /* Base variables */
    const [active, setActive] = useState(true);

    /* ClassNames */
    const classPromptTemplate = classNames({
        [`${styles[promptMessage.template ?? '']}`]: promptMessage.template,
    });

    const classLoadingBar = classNames({
        [`${styles.loadingBar} mt-3 w-0 bgc-primary rounded-full`]: true
    });

    return (
        <Toast show={active}
            delay={5000}
            autohide={true}
            onClose={() => {
                setActive(false);
                RemovePromptMessage();
            }}
            style={{zIndex: 1060}}
        >
            <Toast.Header className={`${classPromptTemplate} c-default fw-lightBold`}
                closeButton={false}
            >
                <p> Notification </p>
            </Toast.Header>
            <Toast.Body>
                {promptMessage.message}

                <div className={classLoadingBar} />
            </Toast.Body>
        </Toast>
    );
}

export default PromptMessage;