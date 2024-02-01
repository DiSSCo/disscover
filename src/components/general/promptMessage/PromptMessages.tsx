/* Import Dependencies */
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";

/* Import Store */
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getPromptMessages, removeFromPromptMessages } from "redux/general/GeneralSlice";

/* Import Components */
import PromptMessage from "./PromptMessage";


const PromptMessages = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const promptMessages = useAppSelector(getPromptMessages);
    const [visiblePromptMessages, setVisiblePromptMessages] = useState<{ key: string, message: string, template?: string }[]>([]);
    const [rendered, setRendered] = useState<{ key: string, message: string, template?: string }[]>([]);
    const [toBeRendered, setToBeRendered] = useState<JSX.Element[]>([]);

    /* OnChange of prompt messages: check prompt messages to render or remove */
    useEffect(() => {
        const copyToBeRendered: JSX.Element[] = [...toBeRendered];
        let copyVisiblePromptMessages = [...visiblePromptMessages];
        let copyRendered = [...rendered];

        promptMessages.forEach((promptMessage) => {
            if (!(visiblePromptMessages.find(vpm => promptMessage.key === vpm.key)) && !(rendered.find(vpm => promptMessage.key === vpm.key))) {
                copyToBeRendered.push(<PromptMessage key={promptMessage.key}
                    promptMessage={promptMessage}
                    RemovePromptMessage={() => RemoveFromPromptMessages(promptMessage)}
                />);
                copyVisiblePromptMessages.push(promptMessage);
                copyRendered.push(promptMessage);
            }
        });

        if (!isEmpty(copyRendered)) {
            setToBeRendered(copyToBeRendered);
        }

        if (visiblePromptMessages !== copyVisiblePromptMessages) {
            setVisiblePromptMessages(copyVisiblePromptMessages);
        }

        if (rendered !== copyRendered) {
            setRendered(copyRendered);
        }
    }, [promptMessages]);

    /* Function for removing a prompt message from the state array */
    const RemoveFromPromptMessages = (promptMessage: { key: string, message: string, template?: string }) => {
        /* Remove from local state */
        let copyVisiblePromptMessages = [...visiblePromptMessages];
        let copyToBeRendered = [...toBeRendered];

        copyVisiblePromptMessages.splice(copyVisiblePromptMessages.findIndex(vpm => promptMessage.key === vpm.key), 1);
        setVisiblePromptMessages(copyVisiblePromptMessages);

        copyToBeRendered.splice(copyToBeRendered.findIndex(element => element.key === promptMessage.key, 1));
        setToBeRendered(copyToBeRendered);

        /* Remove from global state */
        dispatch(removeFromPromptMessages(promptMessage));
    }

    return (
        <ToastContainer position="bottom-end"
            className="my-4 mx-5"
            style={{ zIndex: 1060}}
        >
            {toBeRendered.map((promptMessage) => {
                return promptMessage;
            })}
        </ToastContainer>
    );
}

export default PromptMessages;