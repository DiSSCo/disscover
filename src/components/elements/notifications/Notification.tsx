/* Import Dependencies */
import classNames from 'classnames';
import { Toast } from 'react-bootstrap';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { removeFromNotifications } from 'redux-store/GlobalSlice';

/* Import Types */
import { Notification as NotificationType } from 'app/Types';

/* Import Styles */
import styles from './notification.module.scss';


/* Props Type */
type Props = {
    notification: NotificationType
};


const Notification = (props: Props) => {
    const { notification } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Class Names */
    const notificationHeaderClass = classNames({
        [`${styles[notification.template ?? '']}`]: notification.template
    });

    const loadingBarClass = classNames({
        [`${styles.loadingBar} mt-3 w-0 bgc-primary rounded-full`]: true
    });

    return (
        <Toast show={true}
            delay={5000}
            autohide={true}
            onClose={() => {
                dispatch(removeFromNotifications(notification))
            }}
            style={{ zIndex: 1060 }}
        >
            <Toast.Header 
                className={`${notificationHeaderClass} c-default fw-bold`}
                closeButton={false}
            >
                <p> Notification </p>
            </Toast.Header>
            <Toast.Body>
                {notification.message}

                <div className={loadingBarClass} />
            </Toast.Body>
        </Toast>
    );
};

export default Notification;