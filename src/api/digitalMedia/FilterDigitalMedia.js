import DigitalMediaFilterLayer from 'sources/digitalMediaFilterLayer';


function FilterDigitalMedia(digitalMediaItem) {
    let digitalMediaItemProperties = {};

    if (digitalMediaItem) {
        for (let property in DigitalMediaFilterLayer) {
            let propertyInfo;

            if (property in digitalMediaItem) {
                propertyInfo = { ...DigitalMediaFilterLayer[property], ...{ value: digitalMediaItem[property], } };
            } else if (`dwc:${property}` in digitalMediaItem['data']) {
                propertyInfo = { ...DigitalMediaFilterLayer[property], ...{ value: digitalMediaItem['data'][`dwc:${property}`] } };
            } else if (`dcterms:${property}` in digitalMediaItem['data']) {
                propertyInfo = { ...DigitalMediaFilterLayer[property], ...{ value: digitalMediaItem['data'][`dcterms:${property}`] } };
            } else {
                let defaultValue = "Undefined";

                if ('default' in DigitalMediaFilterLayer[property]) {
                    defaultValue = DigitalMediaFilterLayer[property]['default'];
                }

                propertyInfo = { ...DigitalMediaFilterLayer[property], ...{ value: defaultValue } };
            }

            digitalMediaItemProperties[propertyInfo['group']] = { ...digitalMediaItemProperties[propertyInfo['group']], [property]: propertyInfo };
        }
    } else {
        digitalMediaItemProperties['MediaMeta'] = {};
    }

    return digitalMediaItemProperties;
}

export default FilterDigitalMedia;