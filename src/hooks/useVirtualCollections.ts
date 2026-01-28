import { useQuery } from '@tanstack/react-query';
import { getAllVirtualCollections } from 'api/services/virtualCollectionsService';

/* useQuery hook to retrieve all virtual collections by calling the getAllVirtualCollections service */
export const useVirtualCollections = () => {
    return useQuery({
        queryKey: ['virtualCollections'],
        queryFn: getAllVirtualCollections,

        select: (data) => data,
    });
};