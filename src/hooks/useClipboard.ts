import { useState, useCallback } from 'react';

/**
 * Hook for copying a string to the clipboard. This hook is used within the application on multiple places.
 * @param resetTimeout The amount of time the timeout will wait before it sets the hasCopied status back to false
 * @returns The callback copy to execute and the variable hasCopied with either true or false
 */
export const useClipboard = (resetTimeout = 2000) => {
    const [hasCopied, setHasCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard API not available");
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setHasCopied(true);
            
            // Reset the status after a timeout
            setTimeout(() => setHasCopied(false), resetTimeout);
            return true;
        } catch (error) {
            console.error("Copy failed", error);
            setHasCopied(false);
            return false;
        }
    }, [resetTimeout]);

    return { copy, hasCopied };
};