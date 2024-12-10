/* Import Dependencies */
import { useEffect, useState } from "react";
import classNames from "classnames";

/* Import Webroot */
import ExplanationAudio from 'webroot/audio/audioExplanation.mp3';


/**
 * Component that renders the footer plugin for in the footer
 * @returns JSX Component
 */
const FooterPlugin = () => {
    /* Base variables */
    const [bootPlugin, setBootPlugin] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>();
    const codeCheck: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    let pluginCode: number[] = [];

    /**
     * Function to check the provived key order
     * @param event The key event
     */
    const CheckKeyOrder = (event: any) => {
        pluginCode.push(event.keyCode);

        /* Check if key code still complies with code check, otherwise reset */
        if ((pluginCode[pluginCode.length - 1] === codeCheck[pluginCode.length - 1])) {
            if (pluginCode.length === 11) {
                /* Boot plugin */
                setBootPlugin(true);

                /* Execute plugin function */
                const audioExplanation = new Audio(ExplanationAudio);

                audioExplanation.play();
            }
        } else {
            pluginCode = [];
        }
    };

    /* Bind key listener to document */
    useEffect(() => {
        document.addEventListener('keydown', CheckKeyOrder, false);
    }, []);

    useEffect(() => {
        /* If boot plugin is loaded, start explanation process */
        if (bootPlugin) {
            setInterval(() => {
                setBackgroundColor(Math.floor(Math.random()*16777215).toString(16));
            }, 1250);
        }
    }, [bootPlugin]);

    /* Class Names */
    const footerPluginClass = classNames({
        'opacity-25': backgroundColor,
        'd-none': !bootPlugin
    });

    return (
        <div className={`${footerPluginClass} position-fixed h-100 w-100 top-0 start-0`}
            style={{
                backgroundColor: `#${backgroundColor}`
            }}
        />
    );
};

export default FooterPlugin;