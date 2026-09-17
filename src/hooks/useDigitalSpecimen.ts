import { useQuery } from '@tanstack/react-query';
import { getDigitalSpecimenComplete } from 'services/digitalSpecimenService/getDigitalSpecimenComplete';
import { mapDigitalSpecimen, mapDigitalSpecimenMedia } from 'utils/DataMappers/digitalSpecimenDataMapper';
import { LONG_STALE_TIME, LONG_GC_TIME } from "utils/Constants";

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
            ...mapDigitalSpecimenMedia(data)
        }),
        enabled,
        staleTime: LONG_STALE_TIME,
        gcTime: LONG_GC_TIME
    });
};