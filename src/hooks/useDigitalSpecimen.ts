/* import dependencies */
import { useQuery } from '@tanstack/react-query';

/* Import api services */
import { getDigitalSpecimenComplete } from 'services/digitalSpecimenService/getDigitalSpecimenComplete';
import { getDigitalSpecimenVersions } from 'services/digitalSpecimenService/getDigitalSpecimenVersions';
import { getDigitalSpecimens } from 'services/digitalSpecimenService/getDigitalSpecimens';
import { getDigitalSpecimenAggregations } from 'services/digitalSpecimenService/getDigitalSpecimenAggregations';

/* Import utils */
import { mapDigitalSpecimen, mapDigitalSpecimenMedia, mapEntityRelationships, mapIdentificationData } from 'utils/DataMappers/digitalSpecimenDataMapper';
import { LONG_STALE_TIME, LONG_GC_TIME } from "utils/Constants";

/* Import types */
import { SearchFilters } from 'app/Types';

type UseDigitalSpecimenOptions = {
    doi: string;
    version?: number;
    enabled?: boolean;
};

/* useQuery hook to retrieve the complete Digital Specimen data object by calling the getDigitalSpecimenComplete service */
export const useDigitalSpecimenComplete = ({ 
    doi, 
    version, 
    enabled = true 
}: UseDigitalSpecimenOptions) => {
    return useQuery({
        queryKey: ['digitalSpecimen', doi, version],
        queryFn: () => getDigitalSpecimenComplete({ doi, version }),
        select: (data) => ({
            ...data,
            ...mapDigitalSpecimen(data),
            ...mapDigitalSpecimenMedia(data),
            ...mapIdentificationData(data),
            ...mapEntityRelationships(data?.data?.attributes?.digitalSpecimen)
        }),
        enabled,
        staleTime: LONG_STALE_TIME,
        gcTime: LONG_GC_TIME
    });
};

/* UseQuery hook to retrieve the versions that a digital specimen has */
export const useDigitalSpecimenVersions = ({
    handle,
}: { handle: string }) => {
    return useQuery({
        queryKey: ['digitalSpecimenVersions', handle ],
        queryFn: () => getDigitalSpecimenVersions({ handle }),
        staleTime: LONG_STALE_TIME,
        gcTime: LONG_GC_TIME,
        /* Added retry limit for this hook, due to data issues out of our control */
        retry: 3,
    });
};

/* UseQuery hook to retrieve (or: search) digital specimens, either all or based on search filters */
export const useDigitalSpecimens = ({
    pageSize, pageNumber, searchFilters
}: { searchFilters?: SearchFilters, pageSize: number, pageNumber?: number }) => {

    const queryResult = useQuery({
        queryKey: ['digitalSpecimens', { pageSize, pageNumber, searchFilters }],
        queryFn: () => getDigitalSpecimens({ pageSize, pageNumber, searchFilters }),
    });

    /* Catching both data and meta data for pagination */
    return {
        ...queryResult,
        data: queryResult.data?.data,
        meta: queryResult.data?.meta,
    };
}

/* UseQuery hook to retrieve aggregations of all digital specimens, either all or based on search filters */
export const useDigitalSpecimenAggregations = ({ activeFilter, searchFilters }: { activeFilter?: string, searchFilters?: SearchFilters }) => {
    return useQuery({
        queryKey: ['digitalSpecimenAggregations', { activeFilter, searchFilters }],
        queryFn: () => getDigitalSpecimenAggregations({ activeFilter, searchFilters }),
    });
}