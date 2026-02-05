import { useQuery } from '@tanstack/react-query';
import { getAllVirtualCollections } from 'services/virtualCollectionService/virtualCollectionService';

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