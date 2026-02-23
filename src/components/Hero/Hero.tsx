/* Import components */
import { ArrowLeftIcon, ClipboardCopyIcon, CopyIcon } from "@radix-ui/react-icons";
import { Badge, Button, Dialog, Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

/* Import styling */
import './Hero.scss';

/* Import utilities */
import { RetrieveEnvVariable } from "app/Utilities";

/* Import dependencies */
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
    title: string;
    description: string;
    badge?: string[];
    navigateTo?: { pathName: string; text: string };
    share?: boolean;
    details?: any;
}

export const Hero = ( { title, description, badge, navigateTo, share, details }: Props) => {
    /* Base variables */
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;

        const checkOverflow = () => {
            // Check if actual content height is greater than the visible clamped height
            const hasOverflow = element.scrollHeight > element.clientHeight;
            setShowMoreBtn(hasOverflow);
        };

        // Check on mount
        checkOverflow();

        // Check on resize (crucial for responsive layouts)
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [description]);

    return (
        <header>
            <div id="hero-top-buttons">
            {navigateTo &&
                <Link to={navigateTo?.pathName} className="navigation-link">
                    <ArrowLeftIcon />
                    {navigateTo?.text}
                </Link>
            }
            {share &&
                <Button variant="solid">
                    Share
                    <ClipboardCopyIcon />
                </Button>
            }
            </div>

            {badge?.map((badge: string) => {
                return (
                    <Badge color="sky" variant="solid" key={badge}>{badge}</Badge>
                )
            })}
            <h1>{title}</h1>
            <div id="hero-content">
                <div className="description-container">
                    <p ref={descriptionRef} className="clamped-description">
                        {description}
                    </p>

                    {showMoreBtn && (
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
                    <p><span>Last updated: </span>{details?.['schema:dateModified']}</p>
                    <p><span>Curated by </span>{details?.['schema:creator']['schema:name']}</p>
                    <p><span>DOI:</span> {details?.['@id'].replace(RetrieveEnvVariable('HANDLE_URL'), '')} <CopyIcon /></p>
                </div>
                }
            </div>
        </header>
    )
}