import { useQuery } from "@tanstack/react-query";
import { getDigitalMedia } from "services/digitalMediaService/getDigitalMedia";


/* Base constants */
const staleTime = 1000 * 60 * 5; // How long until the time is stale
const gcTime = 1000 * 60 * 10; // Cache time: How long to store it in the cache

/**
 * Hook that calls the getDigitalMedia service and stores it in a key to be reused
 * Takes handle and optional version as a parameter object
 * @returns The response of the service
 */
export const useDigitalMedia = ({ handle, version }: { handle: string, version?: number }) => {
    return useQuery({
        queryKey: ['digitalMedia', handle, version],
        queryFn: () => getDigitalMedia({ handle, version }),
        staleTime,
        gcTime,
    });
};