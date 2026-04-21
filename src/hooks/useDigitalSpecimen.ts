import { useQuery } from '@tanstack/react-query';
import { getDigitalSpecimenComplete } from 'services/digitalSpecimenService/getDigitalSpecimenComplete';
import { mapDigitalSpecimen } from 'utils/DataMappers/digitalSpecimenDataMapper';

/* Base constants */
const staleTime = 1000 * 60 * 5; // How long until the time is stale
const gcTime = 1000 * 60 * 10; // Cache time: How long to store it in the cache

/* useQuery hook to retrieve the complete Digital Specimen data object by calling the getDigitalSpecimenComplete service */
export const useDigitalSpecimenComplete = ({ doi, version }:
    { doi: string, version?: number }) => {
    return useQuery({
        queryKey: ['digitalSpecimen', doi, version],
        queryFn: () => getDigitalSpecimenComplete({ doi, version }),
        select: (data) => {
            return {
                ...data,
                ...mapDigitalSpecimen(data),
            }
        },
        staleTime,
        gcTime
    });
};