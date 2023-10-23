/* Import Sources */
import DigitalMediaFilterLayer from 'sources/digitalMediaFilterLayer.json';

/* Import Types */
import { DigitalMedia, Dict } from 'app/Types';


const FilterDigitalMedia = (digitalMediaItem: DigitalMedia) => {
    /* Set property as type of JSON */
    type property = keyof typeof DigitalMediaFilterLayer;

    let digitalMediaItemProperties: Dict = {};

    if (!digitalMediaItem.digitalEntity.data) {
        digitalMediaItem.digitalEntity.data = {};
    }

    if (digitalMediaItem) {
        for (let property in DigitalMediaFilterLayer) {
            let propertyInfo;

            if (property in digitalMediaItem) {
                propertyInfo = { ...DigitalMediaFilterLayer[property as property], ...{ value: digitalMediaItem[property as keyof DigitalMedia], } };
            } else if (`dwc:${property}` in digitalMediaItem) {
                propertyInfo = { ...DigitalMediaFilterLayer[property as property], ...{ value: digitalMediaItem.digitalEntity[`dwc:${property}`] } };
            } else if (`dcterms:${property}` in digitalMediaItem) {
                propertyInfo = { ...DigitalMediaFilterLayer[property as property], ...{ value: digitalMediaItem.digitalEntity[`dcterms:${property}`] } };
            } else {
                let defaultValue: any = "Undefined";

                if ('default' in DigitalMediaFilterLayer[property as property]) {
                    type d = keyof typeof DigitalMediaFilterLayer[property];

                    defaultValue = DigitalMediaFilterLayer[property as property]['default' as d];
                }

                propertyInfo = { ...DigitalMediaFilterLayer[property as property], ...{ value: defaultValue } };
            }

            digitalMediaItemProperties[propertyInfo['group']] = { ...digitalMediaItemProperties[propertyInfo['group']], [property]: propertyInfo };
        }
    } else {
        digitalMediaItemProperties['MediaMeta'] = {};
    }

    return digitalMediaItemProperties;
}

export default FilterDigitalMedia;