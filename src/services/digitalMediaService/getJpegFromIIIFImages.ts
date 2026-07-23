/**
 * Service that retrieves the jpeg images for IIIF images
 * @returns A string that contains the jpeg url
 */
export async function getJpegFromIIIFImages(image: any) {
    try {
        const response = await fetch(image["ac:accessURI"]);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        /* IIIF v2 path and IIIF v3 fallback */
        const service = data.sequences?.[0]?.canvases?.[0]?.images?.[0]?.resource?.service || data.items?.[0]?.items?.[0]?.items?.[0]?.body?.service?.[0];

        if (!service) {
            throw new Error("Could not find an image service in this manifest.");
        }

        /* IIIF v2 uses '@id', IIIF v3 uses 'id' */
        const imageServiceId = service['@id'] || service.id;

        /* Throw error if both ids are undefined or null */
        if (!imageServiceId) {
            throw new Error("Image service found, but missing an '@id' or 'id' property.");
        }

        return `${imageServiceId}/full/max/0/default.jpg`;

    } catch (error) {
        console.error("Failed to parse IIIF manifest:", error);

        throw error;
    }
}