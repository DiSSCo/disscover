/* Import dependencies */
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { STALE_TIME, GC_TIME } from "utils/Constants";

/* Import services */
import { getAllVirtualCollections } from 'services/virtualCollectionService/getAllVirtualCollections';
import { getSelectedVirtualCollection } from 'services/virtualCollectionService/getSelectedVirtualCollection';
import { getVirtualCollectionDetails } from 'services/virtualCollectionService/getVirtualCollectionDetails';
import { postNewVirtualCollection } from 'services/virtualCollectionService/postNewVirtualCollection';

/* Import types */
import { NewVirtualCollectionRequest } from 'types/serviceTypes';

/**
 * Hook that calls the getAllVirtualCollections service and stores it in a key to be reused
 * Takes pageSize and pageNumber as a parameter object
 * @returns The response of the service
 */
export const useVirtualCollections = ({ pageSize, pageNumber }: { pageSize: number, pageNumber?: number }) => {
    const page = pageNumber ?? 1;

    const queryResult = useQuery({
        queryKey: ['virtualCollections', { pageNumber, pageSize: page }],
        queryFn: () => getAllVirtualCollections({ pageSize, pageNumber: page }),
        staleTime: STALE_TIME,
        gcTime: GC_TIME
    });

    return {
        ...queryResult,
        data: queryResult.data?.data,
        meta: queryResult.data?.meta,
    };
};

/**
 * Hook that calls the getVirtualCollectionDetails service and stores it in a key to be reused
 * Takes pageSize, pageNumber and virtualCollectionID as a parameter object
 * We use keepPreviousData here to show previous data until new data has been retrieved
 * @returns The response of the service
 */
export const useVirtualCollectionDetails = ({ pageSize, pageNumber, virtualCollectionID }:
    { pageSize: number, pageNumber?: number, virtualCollectionID: string }) => {
    /* Default pageNumber to 1 for consistent caching (so undefined and 1 share the same cache) */
    const page = pageNumber ?? 1;

    const queryResult = useQuery({
        queryKey: ['virtualCollectionDetails', virtualCollectionID, { pageNumber: page, pageSize }],
        queryFn: () => getVirtualCollectionDetails({ pageSize, pageNumber: page, virtualCollectionID }),
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
        placeholderData: keepPreviousData
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
        staleTime: STALE_TIME,
        gcTime: GC_TIME
    });
}

/**
 * Hook that calls the postNewVirtualCollection service that creates a new Virtual Collection
 * @returns The response of the service
 */
export const useCreateVirtualCollection = () => {
    return useMutation({
        mutationFn: (requestBody: NewVirtualCollectionRequest) => {
            return postNewVirtualCollection(requestBody);
        }
    })
}