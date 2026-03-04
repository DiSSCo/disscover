/* Import dependencies */
import { useQuery } from '@tanstack/react-query';

/* Import services */
import { getAllVirtualCollections } from 'services/virtualCollectionService/getAllVirtualCollections';
import { getSelectedVirtualCollection } from 'services/virtualCollectionService/getSelectedVirtualCollection';
import { getVirtualCollectionDetails } from 'services/virtualCollectionService/getVirtualCollectionDetails';

/**
 * Hook that calls the getAllVirtualCollections service and stores it in a key to be reused
 * @returns The response of the service
 */
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

/**
 * Hook that calls the getVirtualCollectionDetails service and stores it in a key to be reused
 * Takes pageSize, pageNumber and virtualCollectionID as a parameter object
 * @returns The response of the service
 */
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
    });

    return {
        ...queryResult,
        data: queryResult.data?.data,
        meta: queryResult.data?.meta,
    };
};

/**
 * Hook that calls the getSelectedVirtualCollection service and stores it in a key to be reused
 * @param identifier Specific string that identifies a specific virtual collection
 * @returns The response of the service
 */
export const useSelectedVirtualCollection = ({ identifier }: { identifier: string }) => {
    return useQuery({
        queryKey: ['specificVirtualCollection', identifier],
        queryFn: () => getSelectedVirtualCollection({ identifier }),
        /* How long until the time is stale */
        staleTime: 1000 * 60 * 5, 
        /* Cache time: How long to store it in the cache */
        gcTime: 1000 * 60 * 10,
    });
}