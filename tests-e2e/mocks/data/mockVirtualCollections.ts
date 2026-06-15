export const mockVirtualCollectionsData = {
    "data": [
        {
            "id": "https://hdl.handle.net/TEST/809-ZZH-QC2",
            "type": "ods:VirtualCollection",
            "attributes": {
                "@id": "https://hdl.handle.net/TEST/809-ZZH-QC2",
                "@type": "ods:VirtualCollection",
                "dcterms:identifier": "https://hdl.handle.net/TEST/809-ZZH-QC2",
                "ods:fdoType": "https://hdl.handle.net/21.T11148/2ac65a933b7a0361b651",
                "ods:status": "Active",
                "schema:version": 1,
                "ltc:collectionName": "Type specimen from the Netherlands",
                "ltc:description": "A Virtual Collection capturing all type specimen that were found in the Netherlands.",
                "ltc:basisOfScheme": "Reference Collection",
                "schema:dateCreated": "2025-10-14T08:44:00.321Z",
                "schema:dateModified": "2025-10-14T08:44:00.321Z",
                "schema:creator": {
                    "@id": "https://orcid.org/0000-0002-5669-2769",
                    "@type": "schema:Person",
                    "schema:identifier": "https://orcid.org/0000-0002-5669-2769",
                    "schema:name": "Sam Leeflang",
                    "ods:hasRoles": [
                        {
                            "@type": "schema:Role",
                            "schema:roleName": "virtual-collection-admin"
                        }
                    ],
                    "ods:hasIdentifiers": [
                        {
                            "@id": "https://orcid.org/0000-0002-5669-2769",
                            "@type": "ods:Identifier",
                            "dcterms:title": "orcid",
                            "dcterms:type": "URL",
                            "dcterms:identifier": "https://orcid.org/0000-0002-5669-2769",
                            "ods:isPartOfLabel": false,
                            "ods:gupriLevel": "GloballyUniqueStablePersistentResolvable",
                            "ods:identifierStatus": "Preferred"
                        }
                    ]
                },
                "ods:hasTargetDigitalObjectFilter": {
                    "ods:predicateType": "and",
                    "ods:hasPredicates": [
                        {
                            "ods:predicateType": "equals",
                            "ods:predicateKey": "$['ods:hasEvents'][*]['ods:hasLocation']['dwc:country']",
                            "ods:predicateValue": "Netherlands"
                        },
                        {
                            "ods:predicateType": "in",
                            "ods:predicateKey": "$['ods:hasIdentifications'][*]['dwc:typeStatus']",
                            "ods:predicateValues": [
                                "holotype",
                                "Holotype",
                                "type",
                                "Type",
                                "isotype",
                                "syntype",
                                "Syntype",
                                "isotype",
                                "paratype"
                            ]
                        }
                    ]
                }
            }
        },
        {
            "id": "https://hdl.handle.net/TEST/Y83-ZNJ-0K6",
            "type": "ods:VirtualCollection",
            "attributes": {
                "@id": "https://hdl.handle.net/TEST/Y83-ZNJ-0K6",
                "@type": "ods:VirtualCollection",
                "dcterms:identifier": "https://hdl.handle.net/TEST/Y83-ZNJ-0K6",
                "ods:fdoType": "https://hdl.handle.net/21.T11148/2ac65a933b7a0361b651",
                "ods:status": "Active",
                "schema:version": 1,
                "ltc:collectionName": "Put all African fish collection of the Africamuseum in a VC",
                "ltc:description": "Testing if the specimen get updated correctly",
                "ltc:basisOfScheme": "Reference Collection",
                "schema:dateCreated": "2025-10-13T13:45:36.200Z",
                "schema:dateModified": "2025-10-13T13:45:36.200Z",
                "schema:creator": {
                    "@id": "https://orcid.org/0000-0002-5669-2769",
                    "@type": "schema:Person",
                    "schema:identifier": "https://orcid.org/0000-0002-5669-2769",
                    "schema:name": "Sam Leeflang",
                    "ods:hasRoles": [
                        {
                            "@type": "schema:Role",
                            "schema:roleName": "virtual-collection-admin"
                        }
                    ],
                    "ods:hasIdentifiers": [
                        {
                            "@id": "https://orcid.org/0000-0002-5669-2769",
                            "@type": "ods:Identifier",
                            "dcterms:title": "orcid",
                            "dcterms:type": "URL",
                            "dcterms:identifier": "https://orcid.org/0000-0002-5669-2769",
                            "ods:isPartOfLabel": false,
                            "ods:gupriLevel": "GloballyUniqueStablePersistentResolvable",
                            "ods:identifierStatus": "Preferred"
                        }
                    ]
                },
                "ods:hasTargetDigitalObjectFilter": {
                    "ods:predicateType": "equals",
                    "ods:predicateKey": "$['ods:sourceSystemID']",
                    "ods:predicateValue": "https://hdl.handle.net/TEST/RY4-CR8-0G1"
                }
            }
        },
        {
            "id": "https://hdl.handle.net/TEST/16Z-TT6-96B",
            "type": "ods:VirtualCollection",
            "attributes": {
                "@id": "https://hdl.handle.net/TEST/16Z-TT6-96B",
                "@type": "ods:VirtualCollection",
                "dcterms:identifier": "https://hdl.handle.net/TEST/16Z-TT6-96B",
                "ods:fdoType": "https://hdl.handle.net/21.T11148/2ac65a933b7a0361b651",
                "ods:status": "Active",
                "schema:version": 1,
                "ltc:collectionName": "Plantea holotypes. Six test collection, now with a more complex statement, hitting multiple specimen.",
                "ltc:description": "Testing if the specimen get updated correctly",
                "ltc:basisOfScheme": "Reference Collection",
                "schema:dateCreated": "2025-10-13T08:23:01.502Z",
                "schema:dateModified": "2025-10-13T08:23:01.502Z",
                "schema:creator": {
                    "@id": "https://orcid.org/0000-0002-5669-2769",
                    "@type": "schema:Person",
                    "schema:identifier": "https://orcid.org/0000-0002-5669-2769",
                    "schema:name": "Sam Leeflang",
                    "ods:hasRoles": [
                        {
                            "@type": "schema:Role",
                            "schema:roleName": "virtual-collection-admin"
                        }
                    ],
                    "ods:hasIdentifiers": [
                        {
                            "@id": "https://orcid.org/0000-0002-5669-2769",
                            "@type": "ods:Identifier",
                            "dcterms:title": "orcid",
                            "dcterms:type": "URL",
                            "dcterms:identifier": "https://orcid.org/0000-0002-5669-2769",
                            "ods:isPartOfLabel": false,
                            "ods:gupriLevel": "GloballyUniqueStablePersistentResolvable",
                            "ods:identifierStatus": "Preferred"
                        }
                    ]
                },
                "ods:hasTargetDigitalObjectFilter": {
                    "ods:predicateType": "and",
                    "ods:hasPredicates": [
                        {
                            "ods:predicateType": "equals",
                            "ods:predicateKey": "$['ods:hasIdentifications'][*]['ods:hasTaxonIdentifications'][*]['dwc:kingdom']",
                            "ods:predicateValue": "Plantae"
                        },
                        {
                            "ods:predicateType": "equals",
                            "ods:predicateKey": "$['ods:hasIdentifications'][*]['dwc:typeStatus']",
                            "ods:predicateValues": [
                                "holotype",
                                "Holotype"
                            ]
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "first": "https://dev.dissco.tech/api/virtual-collection/v1?&pageNumber=1&pageSize=10",
        "next": null,
        "prev": null,
        "self": "https://dev.dissco.tech/api/virtual-collection/v1?&pageNumber=1&pageSize=10"
    },
    "meta": null
}