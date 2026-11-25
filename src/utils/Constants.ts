/* API service constants */
/* Long time is for static data, e.g. digital specimen data */
const LONG_STALE_TIME = 1000 * 60 * 60 * 12; // 12 hours until time is stale
const LONG_GC_TIME = 1000 * 60 * 60 * 12; // 12 hours to store data in the cache

/* Short time is for dynamic data, e.g. annotation & virtual collection data */
const SHORT_STALE_TIME = 1000 * 60 * 5; // 5 minutes until time is stale
const SHORT_GC_TIME = 1000 * 60 * 10; // 10 minutes to store data in the cache

/* URLs */
const OSD_URL = 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/';
const MIDS_URL = 'https://mids.tdwg.org/information-elements/index.html#4-mids-levels';
const W3C_ANNO_JSONID_URL = 'http://www.w3.org/ns/anno.jsonld';
const W3C_MEDIA_FRAGS_URL = 'http://www.w3.org/TR/media-frags/';

export {
    LONG_STALE_TIME,
    LONG_GC_TIME,
    SHORT_STALE_TIME,
    SHORT_GC_TIME,
    OSD_URL,
    MIDS_URL,
    W3C_ANNO_JSONID_URL,
    W3C_MEDIA_FRAGS_URL
}