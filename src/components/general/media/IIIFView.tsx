// @ts-nocheck

/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import OpenSeaDragon from 'openseadragon';

/* Import Types */
import { Dict } from 'global/Types';
import { Viewer } from 'openseadragon';


/* Props Typing */
interface Props {
    mediaUrl: string
};


const IIIFView = (props: Props) => {
    const { mediaUrl } = props;

    /* Base Variables */
    const [manifest, setManifest] = useState<Dict>({});
    const [viewer, setViewer] = useState<Viewer>();

    const GetManifest = async (mediaUrl: string) => {
        try {
            const response = await fetch(mediaUrl);
            const manifest = await response.json();

            setManifest(manifest);
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        GetManifest(mediaUrl);
    }, []);

    const InitOpenseadragon = (infoUrl: string, width: number, height: number) => {
        viewer && viewer.destroy();
        setViewer(
            OpenSeaDragon({
                id: "openSeaDragon",
                preserveViewport: true,
                visibilityRatio: 1,
                defaultZoomLevel: 0,
                sequenceMode: true,
                tileSources: {
                    "@context": "http://iiif.io/api/image/2/context.json",
                    "@id": infoUrl,
                    "height": height,
                    "width": width,
                    "profile": ["http://iiif.io/api/image/2/level2.json"],
                    "protocol": "http://iiif.io/api/image",
                    "tiles": [{
                        "scaleFactors": [1, 2, 4, 8, 16, 32],
                        "width": 1024
                    }]
                },
                showFullPageControl: false,
                showHomeControl: false,
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/"
            })
        );
    };

    useEffect(() => {
        if (!isEmpty(manifest)) {
            /* Try to structure the info.json file link from the first image in the manifest file */
            let infoUrl: string = '';
            let width: number = 0;
            let height: number = 0;

            try {
                /* Manifest version 2 */
                let versionTwoId = manifest.sequences[0].canvases[0].images[0].resource['@id'];

                if (!(versionTwoId.includes('/info.json'))) {
                    versionTwoId = manifest.sequences[0].canvases[0].images[0].resource.service['@id'];
                }

                infoUrl = versionTwoId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = versionTwoId = manifest.sequences[0].canvases[0].width;
                height = versionTwoId = manifest.sequences[0].canvases[0].height;
            } catch {
                /* Manifest version 3 */
                const versionThreeId = manifest.items[0].items[0].items[0].body.id;

                infoUrl = versionThreeId.replace('/info.json', '');

                /* Set Canvas Width and Height */
                width = versionThreeId.items[0].width;
                height = versionThreeId.items[0].height;
            }

            InitOpenseadragon(infoUrl, width, height);
            return () => {
                viewer && viewer.destroy();
            };
        }
    }, [manifest]);

    return (
        <div id="openSeaDragon" style={{ width: '100%', height: '100%' }} />
    );
}

export default IIIFView;