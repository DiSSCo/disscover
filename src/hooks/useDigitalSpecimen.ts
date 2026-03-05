import { useQuery } from '@tanstack/react-query';
import { getDigitalSpecimenComplete } from 'services/digitalSpecimenService/getDigitalSpecimenComplete';

/* Base constants */
const staleTime = 1000 * 60 * 5; // How long until the time is stale
const gcTime = 1000 * 60 * 10; // Cache time: How long to store it in the cache

/* useQuery hook to retrieve all virtual collections by calling the getAllVirtualCollections service */
export const useDigitalSpecimenComplete = ({ handle, version }:
    { handle: string, version?: number }) => {
    const queryResult = useQuery({
        queryKey: ['digitalSpecimen'],
        queryFn: () => getDigitalSpecimenComplete({ handle, version }),
        staleTime,
        gcTime
    });
    console.log('queryResult', queryResult);

    return {
        ...queryResult,
        data: queryResult.data,
    }
};