import { useQuery } from '@tanstack/react-query';
import { getAllVirtualCollections, getVirtualCollectionDetails } from 'services/virtualCollectionService/virtualCollectionService';

/* useQuery hook to retrieve all virtual collections by calling the getAllVirtualCollections service */
export const useVirtualCollections = () => {
    return useQuery({
        queryKey: ['virtualCollections'],
        queryFn: getAllVirtualCollections,
        /* How long until the time is stale */
        staleTime: 1000 * 60 * 5, 
        /* Cache time: How long to store it in the cache */
        gcTime: 1000 * 60 * 10,
    });
};

export const useVirtualCollectionDetails = ({ pageSize, pageNumber, virtualCollectionID }:
    { pageSize: number, pageNumber?: number, virtualCollectionID: string }) => {
    /* Default pageNumber to 1 for consistent caching (so undefined and 1 share the same cache) */
    const page = pageNumber ?? 1;

    const queryResult = useQuery({
        queryKey: ['virtualCollectionDetails', virtualCollectionID, { pageNumber: page, pageSize }],
        queryFn: () => getVirtualCollectionDetails({ pageSize, pageNumber: page, virtualCollectionID }),
        /* How long until the time is stale */
        staleTime: 1000 * 60 * 5, 
        /* Cache time: How long to store it in the cache */
        gcTime: 1000 * 60 * 10,
        /* Only run query if we have an ID */
        enabled: !!virtualCollectionID,
    });
    console.log('queryResult', queryResult);

    return {
        ...queryResult,
        data: queryResult.data?.data,
        meta: queryResult.data?.meta,
    };
};