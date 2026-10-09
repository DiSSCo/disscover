/* Import dependencies */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RetrieveEnvVariable } from "app/Utilities";

/* Import services */
import { getDigitalMedia } from "services/digitalMediaService/getDigitalMedia";
import { getJpegFromIIIFImages } from "services/digitalMediaService/getJpegFromIIIFImages";

/* Import utils */
import { mapDigitalMediaData } from "utils/DataMappers/digitalSpecimenDataMapper";
import { LONG_STALE_TIME, LONG_GC_TIME } from "utils/Constants";

/* Types & interfaces */
import { ImageFormat } from "types/digitalMediaTypes";

/**
 * Hook that calls the getDigitalMedia service and stores it in a key to be reused
 * Takes handle and optional version as a parameter object
 * @returns The response of the service
 */
export const useDigitalMedia = ({ handle, version }: { handle: string, version?: number }) => {
    return useQuery({
        queryKey: ['digitalMedia', handle, version],
        queryFn: () => getDigitalMedia({ handle, version }),
        select: (data) => ({
            ...data,
            ...mapDigitalMediaData(data),
        }),
        staleTime: LONG_STALE_TIME,
        gcTime: LONG_GC_TIME
    });
};

/** 
 * Hook that calls the jpegToIiif service to convert a single uri into jpg
 * Takes imageUri as a parameter
 * @returns the response of the service, in this case a jpg uri of the image
 */
export const useSingleIIIFConverter = (imageUri: string | null) => {
    return useQuery({
        queryKey: ['iiifConverter', imageUri],
        queryFn: () => getJpegFromIIIFImages(imageUri),
        staleTime: LONG_STALE_TIME,
        gcTime: LONG_GC_TIME,
        enabled: Boolean(imageUri),
    })
}

/**
 * This useEffect hook retrieves the jpg/jpeg url from IIIF images upon loading
 * @returns mainImage, the activeId of the image active, cleanDoi path,function to set image
 */
export const useDigitalMediaRetriever = (specimen?: any) => {
    /* Array to use for the digital media list */
    const [correctImageFormats, setCorrectImageFormats] = useState<ImageFormat[]>([]);

    /* Very first image to show on digital specimen overview */
    const [mainImage, setMainImage] = useState<string | null>(null);

    const allImages = specimen?.digitalMedia?.map((item: any) => item['digitalMediaObject']) || [];
    const activeImageObject = correctImageFormats.find(item => item.img === mainImage);
    const activeId = activeImageObject?.id || specimen?.digitalMedia?.[0]?.['digitalMediaObject']?.["@id"] || '';

    /* Getting the doi path for the selected image to navigate */
    const cleanDoiPath = activeId ? activeId.replace(RetrieveEnvVariable('DOI_URL'), '') : '';

    useEffect(() => {
        let isMounted = true;

        if (!allImages.length) {
            setCorrectImageFormats([]);
            setMainImage(null);
            return;
        }

        const fetchImages = async () => {
            try {
                const promises = allImages.map(async (img: any) => {
                    const format = img["dcterms:format"]?.toLowerCase();

                    if (format === 'image/jpeg' || format === 'image/jpg') {
                        return { img: img["ac:accessURI"], id: img["@id"] };
                    }
                    if (format === 'application/json') {
                        return { img: await getJpegFromIIIFImages(img["ac:accessURI"]), id: img["@id"] };
                    }
                    return null;
                });

                const results = await Promise.all(promises);
                const filteredResults = results.filter((item): item is ImageFormat => item !== null);

                if (isMounted) {
                    setCorrectImageFormats(filteredResults);
                    if (filteredResults.length > 0) {
                        setMainImage(filteredResults[0].img);
                    }
                }
            } catch (error) {
                console.error("Failed to process image formats:", error);
            }
        };

        void fetchImages();

        return () => {
            isMounted = false;
        };
    }, [specimen]);

    return {
        mainImage,
        setMainImage,
        activeId,
        cleanDoiPath,
        correctImageFormats
    };
};