/* Import Dependencies */
import { ToastContainer } from "react-bootstrap";

/* Import Hooks */
import { useAppSelector } from "app/Hooks";

/* Import Store */
import { getNotifications } from "redux-store/GlobalSlice";

/* Import Components */
import Notification from "./Notification";


const Notifications = () => {
    /* Base variables */
    const notifications = useAppSelector(getNotifications);

    return (
        <ToastContainer position="bottom-end"
            className="my-4 mx-5"
            style={{ zIndex: 1060 }}
        >
            {notifications.map((notification) => (
                <Notification key={notification.key}
                    notification={notification}
                />
            ))}
        </ToastContainer>
    );
};

export default Notifications;