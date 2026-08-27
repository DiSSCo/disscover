import { useQuery } from "@tanstack/react-query";
import { getDigitalMedia } from "services/digitalMediaService/getDigitalMedia";
import { STALE_TIME, GC_TIME } from "utils/Constants";

/**
 * Hook that calls the getDigitalMedia service and stores it in a key to be reused
 * Takes handle and optional version as a parameter object
 * @returns The response of the service
 */
export const useDigitalMedia = ({ handle, version }: { handle: string, version?: number }) => {
    return useQuery({
        queryKey: ['digitalMedia', handle, version],
        queryFn: () => getDigitalMedia({ handle, version }),
        staleTime: STALE_TIME,
        gcTime: GC_TIME
    });
};