import { useQuery } from '@tanstack/react-query';
import { getDigitalSpecimenComplete } from 'services/digitalSpecimenService/getDigitalSpecimenComplete';
import { mapDigitalSpecimen, mapDigitalSpecimenMedia } from 'utils/DataMappers/digitalSpecimenDataMapper';

/* Base constants */
const staleTime = 1000 * 60 * 5; // How long until the time is stale
const gcTime = 1000 * 60 * 10; // Cache time: How long to store it in the cache

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
        staleTime,
        gcTime
    });
};