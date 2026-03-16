/* Import dependencies */
import { useLayoutEffect, useRef, useState } from "react";
import { format } from "date-fns";
import KeycloakService from "app/Keycloak";

/* Import components */
import { ArrowLeftIcon, ClipboardCopyIcon, CopyIcon, PlusIcon } from "@radix-ui/react-icons";
import { Badge, Button, Dialog, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

/* Import styling */
import './Hero.scss';

/* Import utilities */
import { RetrieveEnvVariable } from "app/Utilities";

type Props = {
    title: string;
    description: string;
    badge?: string[];
    navigateTo?: { pathName: string; text: string };
    share?: boolean;
    details?: any;
    create?: boolean;
}

/**
 * Hero component that illustrates important information of a page and offers extra functionality like navigation & buttons
 * @param title String with title of the page
 * @param description String with description of the page
 * @param badge Array of strings to show one or more badges
 * @param navigateTo Object with pathName and text to make navigation functionality available
 * @param share Boolean that indicates if the URL should be shareable
 * @param details Object with detail information of a particular VC
 * @param create Boolean that indicates if the functionality for creating a VC should be working
 * @returns A JSX element that shows a Hero banner with information and possibly navigation
 */
export const Hero = ( { title, description, badge, navigateTo, share, details, create }: Props) => {
    /* Base variables */
    const [showMoreButton, setShowMoreButton] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const handle = details?.['@id'].replace(RetrieveEnvVariable('HANDLE_URL'), '');
    const hasVirtualCollectionRole = KeycloakService.HasRole(['dissco-virtual-collection']);

    /* Hooks */
    const navigate = useNavigate();

    /* On mount, useLayoutEffect is called to determine if a 'more' button needs to be shown in the description */
    useLayoutEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;

        const checkOverflow = () => {
            /* Check if actual content height is greater than the visible clamped height */
            const hasOverflow = element.scrollHeight > element.clientHeight;
            setShowMoreButton(hasOverflow);
        };
        /* Run function to check overflow on mount */
        checkOverflow();
        /* If app is resized, check overflow again */
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [description]);

    /* Function that copies text to the clipboard */
    const copyToCLipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <header>
            <div id="hero-top-buttons">
                <div>
                {navigateTo &&
                    <Button variant="soft" className="navigation-link" onClick={() => navigate(navigateTo.pathName)}>
                        <ArrowLeftIcon />
                        {navigateTo.text}
                    </Button>
                }
                </div>
                <div>
                {share &&
                    <Button variant="solid" onClick={() => copyToCLipboard(globalThis.location.href)}>
                        Share
                        <ClipboardCopyIcon />
                    </Button>
                }
                </div>
            </div>

            {badge?.map((badge: string) => {
                return (
                    <Badge color="sky" variant="solid" key={badge}>{badge}</Badge>
                )
            })}
            <div id="hero-title">
                <h1>{title}</h1>
                {create &&
                    <Button variant="solid" disabled={!hasVirtualCollectionRole}>
                        Create
                        <PlusIcon />
                    </Button>
                }
            </div>
            <div id="hero-content">
                <div className="description-container">
                    <p ref={descriptionRef} className="clamped-description">
                        {description}
                    </p>

                    {showMoreButton && (
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <button className="read-more-inline">... more</button>
                            </Dialog.Trigger>

                            <Dialog.Content maxWidth="600px" aria-describedby={description}>
                                <Dialog.Title size="5">{title}</Dialog.Title>
                                <Flex direction="column" gap="3">
                                    <p>
                                        {description}
                                    </p>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="solid">
                                            Close
                                        </Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    )}
                </div>

                {details &&
                <div className="details-container">
                    <p><span className="details-label">Last updated: </span>{format(details?.['schema:dateModified'], 'yyyy-dd-MM')}</p>
                    <p><span className="details-label">Curated by </span>{details?.['schema:creator']['schema:name']}</p>
                    <p>
                        <span className="details-label">ID:</span>
                        <button className="btn-as-link"onClick={() => copyToCLipboard(handle)}>
                            {handle}
                            <CopyIcon className="copy-icon" />
                        </button>
                    </p>
                </div>
                }
            </div>
        </header>
    )
}