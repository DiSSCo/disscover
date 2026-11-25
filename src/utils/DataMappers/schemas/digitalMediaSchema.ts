import { DmFieldConfig } from "types/dataMapperTypes";

const DIGITAL_MEDIA_SCHEMA_MAP: DmFieldConfig[] = [
    {
        label: 'Organisation',
        resolve: (dm) => dm["ods:organisationName"],
    },
    {
        label: 'DOI',
        resolve: (dm) => dm["@id"],
        type: 'copy'
    },
    {
        label: 'Hi-res download',
        resolve: (dm) => dm["ac:accessURI"],
        type: 'download'
    },
    {
        label: 'License',
        resolve: (dm) => dm["dcterms:rights"]
    }
];

export default DIGITAL_MEDIA_SCHEMA_MAP;