import { useQuery } from '@tanstack/react-query';
import { getAllVirtualCollections } from 'services/virtualCollectionService/virtualCollectionService';

/* useQuery hook to retrieve all virtual collections by calling the getAllVirtualCollections service */
export const useVirtualCollections = () => {
    return useQuery({
        queryKey: ['virtualCollections'],
        queryFn: getAllVirtualCollections,
    });
};